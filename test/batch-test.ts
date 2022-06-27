
const evaluate = require('../src/eval').evaluate;

describe('batch execution', () => {

  const batch = [
    { variable: 'module', expression: 'module.exports = { test: 1, test1: 2 };'},
    { variable: 'module', expression: 'module.exports = { test: 2 };'},
    { variable: 'module', expression: 'module.exports = { test: 3, a: 1, b: 2};'}
  ];

  test('batch execution', () => {
    const result = evaluate(batch, 5);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(1);
    expect(result[2].length).toBe(3);
  });

});
