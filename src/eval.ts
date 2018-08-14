import { VM, VMScript } from 'vm2';
import { em } from './em';
import { Maybe } from 'tsmonad';

function run(expression: string) {
  const vm = new VM({
    timeout: 300,
    sandbox: { em },
  });

  try {
    return vm.run(expression);
  } catch (e) {
    return null;
  }
}

function runModule(expression: string): Evaluation[] {
  const moduleExports = { exports: {} };
  const vm = new VM({
    timeout: 300,
    sandbox: { em, module: moduleExports },
  });
  let script;

  try {
    if (!expression.includes('module.exports')) {
      throw Error('No module exports defined');
    }

    script = new VMScript(expression).compile();
  } catch (err) {
    return [{
      variable: 'module',
      result: `Failed to compile script: ${err}`,
      errored: true,
    }];
  }

  try {
    vm.run(script);

    return Object.keys(moduleExports.exports).map(key => ({
      variable: key,
      result: (moduleExports.exports as any)[key],
      errored: false,
    }));
  } catch (err) {
    return [{
      variable: 'module',
      result: `Failed to execute script: ${err}`,
      errored: true,
    }];
  }
}

type Evaluated = {
  [key: string]: string | null,
};

type Evaluation = {
  variable: string;
  result: string | null;
  errored: boolean;
};

/**
 * Replaces all variable references in an expression with their correspending value
 * already determined in the `evaluate` function
 * @param {string} expression A Javascript expression, optionally with variables
 * delimited by @ or @@
 * @param {Object<string, string>} evaluated A map of variable names and their values
 * @return {string} The expression with variable references replaced by their values
 */
function replaceVars(expression: string, evaluated: Evaluated) {
  let newExpression = expression;

  Object.keys(evaluated).forEach((variable) => {
    const value = evaluated[variable];

    // Handle double @ and single @
    newExpression = newExpression
      .replace(new RegExp('@@' + variable + '@@', 'g'), Maybe.maybe(value).valueOr('null'));
    newExpression = newExpression
      .replace(new RegExp('@' + variable + '@', 'g'), Maybe.maybe(value).valueOr('null'));
  });

  return newExpression;
}

function stripAts(label: string) {
  return label.replace(new RegExp('@', 'g'), '');
}

type Variable = {
  variable: string,
  expression: string,
};

type ExecutableBlock = Variable & {
  deps: string[],
  referencedBy: string[],
  added: boolean,
};

function orderByDependencies(variables: Variable[]) {

  const all = variables.map((v) => {

    // replace all double @ with single @'s
    const e = v.expression.replace(new RegExp('@@', 'g'), '@');

    // Run a regexp across the expression to find all
    // references to other variables.  Parse and store
    // the references as a map

    const parts = e.split(/(\@V.*?\@)/);

    const result: ExecutableBlock = {
      variable: v.variable,
      expression: v.expression,
      deps: [],
      referencedBy: [],
      added: false,
    };

    if (parts.length === 1) {
      if (parts[0].startsWith('@') && parts[0].endsWith('@')) {
        result.deps.push(stripAts(parts[0]));
      }
    } else if (parts.length > 1) {
      parts.forEach((p) => {
        if (p.startsWith('@') && p.endsWith('@')) {
          result.deps.push(stripAts(p));
        }
      });
    }

    return result;

  });

  const indexes: { [key: string]: number } = all.reduce(
    (p: { [key: string]: number }, c: Variable, i: number) => { p[c.variable] = i; return p; }, {});

  all.forEach((d) => {
    d.deps.forEach(a => all[indexes[a]].referencedBy.push(d.variable));
  });

  const order: ExecutableBlock[] = [];

  let i = 0;
  while (order.length < all.length && i < all.length) {
    i = i + 1;
    all.forEach((a) => {
      if (a.deps.length === 0 && !a.added) {
        order.push(a);
        a.added = true;
        a.referencedBy.forEach((r) => {
          const deps = all[indexes[r]].deps;
          const index = deps.indexOf(a.variable);

          all[indexes[r]].deps.splice(index, 1);
        });
      }
    });
  }

  return order;
}

/**
 * Evaluate a list of expressions. It does not allow forward references, so expressions
 * must only refer to variables previously defined.
 * @param {Variable[]} variables
 * @return {Evaluation[]}
 */
export function evaluate(variables: Variable[]): Evaluation[] {

  if (variables.length === 1 && variables[0].variable === 'module') {
    return runModule(variables[0].expression);
  }

  const ordered = orderByDependencies(variables);

  if (ordered.length !== variables.length) {
    return Object.keys(variables).map(k =>
      ({ variable: k, result: 'cycle detected', errored: true }));
  }

  // Replace all calls to em.emJs with a function to invoke
  // emJsReplaced: Variable[]
  const emJsReplaced = ordered
    .map((v) => {
      if (v.expression.startsWith('em.emJs(')) {
        let body = v.expression.substr(8);
        body = body.substr(0, body.length - 1);

        return {
          variable: v.variable,
          expression: '(function(){' + body + '})()',
        };
      }
      return v;
    });

  // evaluated: Object<string, string> where the keys are variable names and values are
  // the evaluted variable expressions
  const evaluated: Evaluated = emJsReplaced
    .reduce((evaluated: Evaluated, v) => {
      const varsReplaced = replaceVars(v.expression, evaluated);

      const evaled = run(varsReplaced);

      if (evaled !== null) {
        evaluated[v.variable] = v.expression.startsWith('\"') && v.expression.endsWith('\"')
          ? '\"' + evaled + '\"'
          : evaled;
      } else {
        evaluated[v.variable] = null;
      }

      return evaluated;
    },      {});

  return Object.keys(evaluated).map(k => ({
    variable: k,
    result: evaluated[k],
    errored: evaluated[k] === null,
  }));
}
