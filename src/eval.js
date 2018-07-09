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

/* interface Variable {
 *   variable: string;
 *   expression: string;
 * }
 */

/* interface Evaluated {
 *   variable: string;
 *   evaluated: any;
 *   errored: boolean;
 * }
 */

/**
 * Evaluate a list of expressions. It does not allow forward references, so expressions
 * must only refer to variables previously defined.
 * @param {Variable[]} variables
 * @return {Evaluated[]}
 */
function evaluate(variables) {

  // Replace all calls to em.emJs with a function to invoke
  // emJsReplaced: Variable[]
  const emJsReplaced = variables
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