
const all = require('../data/all.json');
const evaluate = require('../src/eval').evaluate;

// specify how many times every test question should be exercised
const NUM_TEST_CYCLES = 10;

describe(`all the real-world questions, ${NUM_TEST_CYCLES} times`, () => {
  Array(0, NUM_TEST_CYCLES).forEach(() => {
    all.forEach((item) => {
      test(`question with uniqueId ${item.uniqueId}`, () => {
        const result = evaluate(item.vars);

        expect(result.every(r => r.errored === false)).toEqual(true);
      });
    });
  });
});
