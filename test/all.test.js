
const all = require('../data/all.json');
const evaluate = require('../src/eval').evaluate;

test('all the real-world questions, 10 times', () => {
  for (let i = 0; i < 10; i++) {
    
    const success = all.reduce((success, item) => {
      const result = evaluate(item.vars);

      if (result.some(r => r.errored === true)) {
        //console.log(item.uniqueId);
        //console.log(item);
        //console.log(result);

        return success;
      }
      return success + 1;
    }, 0);

    expect(success).toEqual(all.length);
  } 
}); 
