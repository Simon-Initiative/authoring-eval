const em = require('../src/em').em;

// This is one unit test. 
test('em.random with lower and upper specified, upper excluded', () => {
  for (let i = 0; i < 1000; i++) {
    const v = '' + em.random(4, 6);
    expect(v).toMatch(/4|5/);
  }
});

// TODO, unit test em.random with two negatives, with one negative one positive, with one
// or more arguments equalling zero, with decimal values.  Verify that it fails (by using
// expect.toThrow) when called with erroneous inputs (when lower greater than upper, when
// passing in string values)