import { VM } from 'vm2';
import { em } from './em';

const vm = new VM({
  timeout: 300,
  sandbox: { em },
});

function run(expression: string) {
  try {
    return vm.run(expression);
  } catch (e) {
    return null;
  }
}

/**
 * Replaces all variable references in an expression with their correspending value
 * already determined in the `evaluate` function
 * @param {string} expression A Javascript expression, optionally with variables
 * delimited by @ or @@
 * @param {Object<string, string>} evaluated A map of variable names and their values
 * @return {string} The expression with variable references replaced by their values
 */
function replaceVars(expression: string, evaluated: { [key: string]: string }) {
  let newExpression = expression;

  Object.keys(evaluated).forEach((variable) => {
    const value = evaluated[variable];

    // Handle double @ and single @
    newExpression = newExpression.replace(new RegExp('@@' + variable + '@@', 'g'), value);
    newExpression = newExpression.replace(new RegExp('@' + variable + '@', 'g'), value);
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

/* interface Variable {
 *   variable: string;
 *   expression: string;
 * }
 */

/* interface Evaluation {
 *   variable: string;
 *   result: string;
 *   errored: boolean;
 * }
 */

/**
 * Evaluate a list of expressions. It does not allow forward references, so expressions
 * must only refer to variables previously defined.
 * @param {Variable[]} variables
 * @return {Evaluation[]}
 */
export function evaluate(variables: Variable[]) {

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
        // 'em.emJs(x=x+1; return x;)'
        // '()=>{

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
  type Evaluated = {
    [key: string]: string | null,
  };
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

  return Object.keys(evaluated).map(k =>
    ({ variable: k, result: evaluated[k], errored: evaluated[k] === null }));
}

module.exports = {
  evaluate,
};
