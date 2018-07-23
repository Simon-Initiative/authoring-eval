const { VM } = require('vm2');
const { em } = require('./em');

const vm = new VM({
  timeout: 300,
  sandbox: { em }
});

function run(expression) {
  try {
    return vm.run(expression, 'vm.js');
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
function replaceVars(expression, evaluated) {

  Object.keys(evaluated).forEach(variable => {
    const value = evaluated[variable];

    // Handle double @ and single @
    expression = expression.replace(new RegExp('@@' + variable + '@@', 'g'), value);
    expression = expression.replace(new RegExp('@' + variable + '@', 'g'), value);
  });

  return expression;
}


function orderByDependencies(variables) {

  const all = variables.map(v => {

    const e = v.expression;

    // Run a regexp across the expression to find all 
    // references to other variables.  Parse and store
    // the references as a map

    const parts = e.split(/(\@V.*?\@)/);

    const result = {
      variable: v.variable,
      expression: v.expression,
      deps: [],
      referencedBy: [],
      added: false,
    }


    if (parts.length === 1) {
      if (parts[0].startsWith('@') && parts[0].endsWith('@')) {
        result.deps.push(parts[0].substring(1, parts[0].lastIndexOf('@')));
      }
    } else if (parts.length > 1) {
      parts.forEach(p => {
        if (p.startsWith('@') && p.endsWith('@')) {
          result.deps.push(p.substring(1, p.lastIndexOf('@')));
        }
      })
    }

    return result;

  });

  
  const indexes = all.reduce((p, c, i) => { p[c.variable] = i; return p; }, {});
  
  all.forEach(d => {
    
    d.deps.forEach(a => all[indexes[a]].referencedBy.push(d.variable));
  });

  const order = [];

  let i = 0;
  while (order.length < all.length && i < all.length) {
    i++;
    all.forEach(a => {
      if (a.deps.length === 0 && !a.added) {
        order.push(a);
        a.added = true;
        a.referencedBy.forEach(r => {

          const deps = all[indexes[r]].deps;
          const index = deps.indexOf(a.variable);

          all[indexes[r]].deps.splice(index, 1);
        });
      }
    }) 
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
function evaluate(variables) {

  const ordered = orderByDependencies(variables);

  if (ordered.length !== variables.length) {
    return Object.keys(variables).map(k => 
      ({ variable: k.variable, result: 'cycle detected', errored: true }));
  }

  // Replace all calls to em.emJs with a function to invoke
  // emJsReplaced: Variable[]
  const emJsReplaced = ordered
    .map(v => {
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
  const evaluated = emJsReplaced
    .reduce((evaluated, v) => {
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
    }, {});

  return Object.keys(evaluated).map(k =>
    ({ variable: k, result: evaluated[k], errored: evaluated[k] === null }));
}

module.exports = {
  evaluate,
};