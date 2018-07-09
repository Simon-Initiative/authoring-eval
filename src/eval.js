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

function replaceVars(expression, evaluated) {
  
  Object.keys(evaluated).forEach(key => {
    const value = evaluated[key];
    
    // Handle double @ and single @
    expression = expression.replace(new RegExp('@@' + key + '@@', 'g'), value);
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