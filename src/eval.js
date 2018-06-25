const { VM } = require('vm2');
const { em } = require('./em');

const vm = new VM({
  timeout: 1000,
  sandbox: { em }
});

function run(expression) {
  return vm.run(expression, 'vm.js');
}

function replaceVars(expression, evaluated) {
  
  Object.keys(evaluated).forEach(key => {
    const value = evaluated[key];
    expression = expression.replace(new RegExp('@' + key + '@', 'g'), value);
  });

  return expression;
}

function evaluate(variables) {

  // replace all calls to em.emJs with a function to invoke
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

  const evaluated = emJsReplaced
    .reduce((evaluated, v) => {
      const varsReplaced = replaceVars(v.expression, evaluated);

      const evaled = run(varsReplaced);

      evaluated[v.variable] = v.expression.startsWith('\"') && v.expression.endsWith('\"')
        ? '\"' + evaled + '\"'
        : evaled;

      return evaluated;
    }, {});

  return Object.keys(evaluated).map(k => ({ variable: k, result: evaluated[k] }));
} 

module.exports = {
  evaluate,
};