const em = require('../src/em').em;

// This is one unit test. 
test('em.random with lower and upper specified, upper excluded', () => {
  for (let i = 0; i < 1000; i++) { 

    const v = '' + em.random(4, 6); // Normal, positive case.
    expect(v).toMatch(/4|5/);

    const a = '' + em.random(0, 5); // One parameter is 0 (w/ positive) test case.
    expect(a).toMatch(/0|1|2|3|4/);

    expect(em.random(0,0)).toBe(0); // Both parameters are 0 test case.

    expect(em.random(14, 14)).toBe(14); // Same number, positive.

    expect(em.random(-1, -1)).toBe(-1); // Same number, negative.

    const b = '' + em.random(-3, -1); // Negative case
    expect(b).toMatch(/-3|-2/);

    const c = '' + em.random(-4, 2); // One negative & one positive.
    expect(c).toMatch(/-4|-3|-2|-1|0|1/);

    expect(() => { // Lower > Upper
    	em.random(3, 1);
    }).toThrow();

    expect(() => { // Lower is a string.
    	em.random("a", 3);
    }).toThrow();

    expect(() => { // Upper is a string
    	em.random(3, "b");
    }).toThrow();

  } 
}); 

test('em.random with no parameters specified', () => {
  for (let i = 0; i < 1000; i++) {

  	expect(em.random()).toBeGreaterThanOrEqual(0); // Lower bound
  	expect(em.random()).toBeLessThan(1); // Upper bound

  } 
}); 

test('em.random with lower, upper, and decimalPosition specified', () => {
  for (let i = 0; i < 1000; i ++) {

  	const a = '' + em.random(3, 8, 2); // Normal case, two positives
  	const dotIndexA = a.lastIndexOf(".");
  	const dotToEndA = a.length - dotIndexA - 1
  	expect(dotToEndA).toBeLessThanOrEqual(2);
  	expect(Number(a)).toBeGreaterThanOrEqual(3);
  	expect(Number(a)).toBeLessThan(8);

  	const b = '' + em.random(-3, 2, 3); // Negative Number to Positive
  	const dotIndexB = b.lastIndexOf(".");
  	const dotToEndB = b.length - dotIndexB - 1
  	expect(dotToEndB).toBeLessThanOrEqual(3);
  	expect(Number(b)).toBeGreaterThanOrEqual(-3);
  	expect(Number(b)).toBeLessThan(2);

  	const c = '' + em.random(-2, 0, 5); // One zero, one negative
  	const dotIndexC = c.lastIndexOf(".");
  	const dotToEndC = c.length - dotIndexC - 1
  	expect(dotToEndC).toBeLessThanOrEqual(5);
  	expect(Number(c)).toBeGreaterThanOrEqual(-2);
  	expect(Number(c)).toBeLessThan(0);

  	const d = '' + em.random(0, 0, 1); // Both zeros
  	expect(Number(d)).toBe(0);

  	const e = '' + em.random(5.13, 9.7, 4);
  	const dotIndexE = e.lastIndexOf(".");
  	const dotToEndE = e.length - dotIndexE - 1
  	expect(dotToEndE).toBeLessThanOrEqual(4);
  	expect(Number(e)).toBeGreaterThanOrEqual(5.13);
  	expect(Number(e)).toBeLessThan(9.7);

  	expect(() => { // Lower > Upper
		em.random(3, 1, 4);
    }).toThrow();

    expect(() => { // decimalPositions is a floating point
    	em.random(3, 4, 1.1);
    }).toThrow();

    expect(() => { // decimalPositions is negative
    	em.random(4, 10, -4); 
    }).toThrow();

    expect(() => {
    	em.random("a", "b", 3); // String inputs for lower and upper
    }).toThrow();

    expect(() => {
    	em.random(1, 3, "a"); // String input for decimalPositions
    }).toThrow();

  }
});

test('em.randomInt with min and max', () => {
  for (let i = 0; i < 1000; i++) {
	const a = em.randomInt(3, 15); // Normal inputs (positive)
	expect(a).toBeGreaterThanOrEqual(3);
	expect(a).toBeLessThan(15);

	const b = em.randomInt(4.4, 9.1); // Floating point inputs
	expect(b).toBeGreaterThanOrEqual(5);
	expect(b).toBeLessThan(9);

	const c = em.randomInt(-4, 19); // Negative inputs
	expect(c).toBeGreaterThanOrEqual(-4);
	expect(c).toBeLessThan(19);

	const d = em.randomInt(-12.3, -1.7); // Negative floating point inputs
	expect(d).toBeGreaterThanOrEqual(-12);
	expect(d).toBeLessThan(-2);

	expect(() => { // string inputs
		em.randomInt("a", "b");
	}).toThrow();

	expect(() => { // boolean inputs
		em.randomInt(true, true);
	}).toThrow();

  }
});

test('em.round with only the number', () => {

  expect(em.round(13.4812)).toBe(13.5); // Normal case, positive number
  expect(em.round(137)).toBe(137); // Whole number
  expect(em.round(1513.55)).toBe(1513.6); // At 5, should round up
  expect(em.round(-13)).toBe(-13); // Negative input
  expect(em.round(-1663.55)).toBe(-1663.5) // At 5, should round up
  expect(em.round(0)).toBe(0) // Zero input
  expect(em.round(0.01)).toBe(0) // Small decimal input
  expect(() => { // boolean input
    em.round(true);
  }).toThrow();
  expect(() => { // string input
    em.randomInt("1");
  }).toThrow();

});

test('em.roundA with both number and decimalPositions specified', () => {

  expect(em.roundA(14.4812, 2)).toBe(14.48); // Normal case, positve number
  expect(em.roundA(194, 2)).toBe(194); //Normal Case 
  expect(em.roundA(14.5555, 3)).toBe(14.556); // At 5, should round up
  expect(em.roundA(-14.12833, 2)).toBe(-14.13); // Negative input
  expect(em.roundA(-14.55555, 4)).toBe(-14.5555); // At 5, should round up
  expect(em.roundA(0, 0)).toBe(0); // Zero input
  expect(em.roundA(123.91, 0)).toBe(124); // Zero as decimalPositions
  expect(em.roundA(-123.91, 0)).toBe(-124) // Zero as decimalPositions with negative input

  expect(() => {
    em.roundA(13.132, -3) // negative input for decimalPositions
  }).toThrow();

  expect(() => {
    em.roundA("a", 2) // string input for number
  }).toThrow();

  expect(() => {
    em.roundA(23.12, "a") // string input for decimalPositions
  }).toThrow();

  expect(() => {
    em.roundA(true, 4) // boolean inputs
  }).toThrow();

  expect(() => {
    em.roundA(21.13, false) // boolean inputs
  }).toThrow();

});

test ('em.almostEqual', () => {

  expect(em.almostEqual(13, 13.001)).toBe(false);
  expect(em.almostEqual(13, 13.001, 10**-3)).toBe(true);
  expect(em.almostEqual(-13, -13.001)).toBe(false);
  expect(em.almostEqual(-13, -13.001, 10**-3)).toBe(true);

  expect(() => em.almostEqual("a", 3)).toThrow();
  expect(() => em.almostEqual(3, "a")).toThrow();
  expect(() => em.almostEqual(10, 10, "a")).toThrow();

});

test ('em.fracA2', () => {

  expect(em.fracA2(3, 4)).toBe("3,4"); // Regular inputs
  expect(em.fracA2(0, 0)).toBe("0,0"); 

});

test ('em.frac2Tex', () => {

  expect(em.frac2Tex(3, 4)).toBe("\\frac{3}{4}"); // Regular inputs
  expect(em.frac2Tex(0, 0)).toBe("\\frac{0}{0}");

});

test ('em.abs', () => {

  expect(em.abs(3)).toBe(3); // Positive input
  expect(em.abs(-3)).toBe(3); // Negative Input
  expect(em.abs(3.8)).toBe(3.8); // Floating input
  expect(em.abs(-3.9)).toBe(3.9); // Negative floating input
  expect(em.abs(0)).toBe(0); // Zero input

  expect(() => em.abs("a")).toThrow(); // string input
  expect(() => em.abs(true)).toThrow(); // boolean input

});

test ('em.ceil', () => {
  expect(em.ceil(15.0001)).toBe(16); // Positive Input
  expect(em.ceil(-15.0001)).toBe(-15); // Negative Input
  expect(() => em.ceil("a")).toThrow(); // String Input
  expect(() => em.ceil(true)).toThrow(); // Boolean Input

});

test ('em.floor', () => {
  expect(em.floor(19.9999)).toBe(19); // Positive Input
  expect(em.floor(-19.9999)).toBe(-20); // Negative Input
  expect(() => em.floor("a")).toThrow(); // String Input
  expect(() => em.floor(true)).toThrow(); // Boolean Input

});

test ('em.factorial', () => {
  expect(em.factorial(0)).toBe(1); // Zero input
  expect(em.factorial(1)).toBe(1);
  expect(em.factorial(2)).toBe(2);
  expect(em.factorial(10)).toBe(3628800); // Positive input

  expect(() => em.factorial(1.1)).toThrow(); // Decimal Input
  expect(() => em.factorial(-1)).toThrow(); // Negative Input
  expect(() => em.factorial("a")).toThrow(); // String Input
  expect(() => em.factorial(true)).toThrow(); // Boolean Input

});

test ('em.gcd', () => {

  expect(em.gcd(20, 50)).toBe(10); // Normal, positive input
  expect(em.gcd(330, 75)).toBe(15);
  expect(em.gcd(12, 0)).toBe(12); // Zero Input
  expect(em.gcd(12, 1)).toBe(1);

  expect(() => em.gcd(-1, 12)).toThrow(); // Negative Input
  expect(() => em.gcd(12, -1)).toThrow();
  expect(() => em.gcd(11.1, 12)).toThrow(); // Decimal Input
  expect(() => em.gcd(12.1, 11)).toThrow();
  expect(() => em.gcd("a", 13)).toThrow(); // String Input
  expect(() => em.gcd(13, "a")).toThrow();
  expect(() => em.gcd(true, 12)).toThrow(); // Boolean Input
  expect(() => em.gcd()).toThrow(); // No inputs given
  expect(() => em.gcd(1)).toThrow(); // Only one input given

});

test ('em.log with only n specified', () => {
  expect(em.log(1)).toBe(0); // Input is 1
  expect(em.log(10)).toBe(1); // If base is 10, then log(10) should equal 1
  expect(em.log(5)).toBeCloseTo(0.69897000433, 10); // Normal Input

  expect(() => em.log(true)).toThrow(); // Boolean Input
  expect(() => em.log(0)).toThrow(); // Zero Input
  expect(() => em.log(-10)).toThrow(); // Negative Input

});

test ('em.log with n and base specified', () => {
  expect(em.log(2, 2)).toBe(1); // If n = base, it equals 1.
  expect(em.log(3, 4)).toBeCloseTo(0.79248125036, 10); // Normal Input

  expect(() => em.log(13, "a")).toThrow(); // String Input
  expect(() => em.log(10, 0)).toThrow(); // Zero input for base

});

test ('em.ln', () => {
  expect(em.ln(1)).toBe(0); // Regular Input
  expect(em.ln(Math.E)).toBe(1);
  expect(em.ln(10)).toBeCloseTo(2.30258509299); // Floating point output

  expect(() => em.ln(0)).toThrow(); // Zero input (undefined)
  expect(() => em.ln(-1)).toThrow(); // Negative Input (undefined)
  expect(() => em.ln("a")).toThrow(); // String input

});

test ('em.max', () => {
  expect(em.max(1,3)).toBe(3); // Normal Input
  expect(em.max(-1.1, -2.3)).toBe(-1.1); // Negative, floating Inputs
  expect(em.max(0, 0)).toBe(0); // Same inputs

  expect(() => em.max("a", "b")).toThrow(); // String inputs
  expect(() => em.max(true, false)).toThrow(); // Boolean inputs

});

test ('em.min', () => {
  expect(em.min(1,3)).toBe(1); // Normal Input
  expect(em.min(-1.1, -2.3)).toBe(-2.3); // Negative, floating Inputs
  expect(em.min(0, 0)).toBe(0); // Same inputs

  expect(() => em.min("a", "b")).toThrow(); // String inputs
  expect(() => em.min(true, false)).toThrow(); // Boolean inputs

});

test ('em.sqrt', () => {
  expect(em.sqrt(4)).toBe(2);
  expect(em.sqrt(9)).toBe(3);
  expect(em.sqrt(0)).toBe(0); // Zero Input
  expect(em.sqrt(3.2)).toBeCloseTo(1.7888543819998317, 10); // Floating input

  expect(() => em.sqrt("a")).toThrow(); // String input
  expect(() => em.sqrt(true)).toThrow(); // Boolean Input
  expect(() => em.sqrt(-3)).toThrow(); // Negative numbers should throw

});

test ('em.sin', () => {
  expect(em.sin(Math.PI)).toBeCloseTo(0, 10);
  expect(em.sin(-Math.PI / 2)).toBeCloseTo(-1, 10);
  expect(em.sin(Math.PI / 2)).toBeCloseTo(1, 10);
  expect(em.sin(20.3)).toBeCloseTo(0.9927664058359071, 10);

  expect(() => em.sin("a")).toThrow(); 
  expect(() => em.sin(true)).toThrow();

});

test ('em.cos', () => {
  expect(em.cos(Math.PI)).toBeCloseTo(-1, 10);
  expect(em.cos(-Math.PI / 2)).toBeCloseTo(0, 10);
  expect(em.cos(Math.PI / 2)).toBeCloseTo(0, 10);
  expect(em.cos(20.3)).toBeCloseTo(0.12006191504242673, 10);

  expect(() => em.cos("a")).toThrow();
  expect(() => em.cos(true)).toThrow();

});

test ('em.tan', () => {
  expect(em.tan(Math.PI)).toBeCloseTo(0, 10);
  expect(em.tan(-Math.PI)).toBeCloseTo(0, 10);
  expect(em.tan(Math.PI / 3)).toBeCloseTo(1.7320508075688767, 10);

  expect(() => em.tan("a")).toThrow();
  expect(() => em.tan(true)).toThrow();
  expect(() => em.tan(Math.PI / 2)).toThrow();
  expect(() => em.tan(-Math.PI / 2)).toThrow();

});

test ('em.exp', () => {

  expect(em.exp(10)).toBeCloseTo(Math.E ** 10, 5);
  expect(em.exp(1)).toBeCloseTo(Math.E, 10);
  expect(em.exp(20)).toBeCloseTo(Math.E ** 20, 5);

  expect(() => em.exp("a")).toThrow();
  expect(() => em.exp(true)).toThrow();

});

test ('em.pow', () => {

  expect(em.pow(2, 3)).toBe(8);
  expect(em.pow(0, 0)).toBe(1);
  expect(em.pow(10, 0)).toBe(1);
  expect(em.pow(10, -1)).toBeCloseTo(0.1, 5);
  expect(em.pow(3, 4)).toBe(81);
  expect(em.pow(-3, 2)).toBe(9);
  expect(em.pow(-2, -4)).toBeCloseTo(0.0625, 5);
  expect(em.pow(-2.6, -3)).toBeCloseTo(-0.05689576695, 5)

  expect(() => em.pow(true)).toThrow();
  expect(() => em.pow('a')).toThrow();
  expect(() => em.pow(-3, -0.5)).toThrow();

});

test ('em.toRadians', () => {

  expect(em.toRadians(0)).toBe(0);
  expect(em.toRadians(360)).toBeCloseTo(Math.PI * 2, 10);
  expect(em.toRadians(180)).toBeCloseTo(Math.PI, 10);
  expect(em.toRadians(-360)).toBeCloseTo(-Math.PI * 2, 10);
  expect(em.toRadians(1.5)).toBeCloseTo(1.5 * (Math.PI/180), 10);

  expect(() => em.toRadians('a')).toThrow();
  expect(() => em.toRadians(false)).toThrow();

});

test ('em.mod', () => {

  expect(em.mod(1,2)).toBe(1);
  expect(em.mod(2,2)).toBe(0);
  expect(em.mod(623, 25)).toBe(23);
  expect(em.mod(-7, 3)).toBe(-1);
  expect(em.mod(-15,3)).toBeCloseTo(0,10);
  expect(em.mod(18, -5)).toBe(3);
  expect(em.mod(-18,-4)).toBe(-2);
  expect(em.mod(2.7, 1.3)).toBeCloseTo(.1, 10);
  expect(em.mod(8.3, -4.15)).toBeCloseTo(0, 10);

  expect(() => em.mod('a', 'b')).toThrow();
  expect(() => em.mod(true, 1)).toThrow();

});

test ('em.randomArray', () => {

  var arr1 = [1];
  var arr2 = [1, 5, 10];
  var arr3 = ['abc', 'def', 'ghi', 'jkl'];
  var arr4 = [true, false];
  var arr5 = [NaN, null, undefined];
  var arr6 = [1, 'abc', true, null];

  for (let i = 0; i < 1000; i++) {

    expect(em.randomArray(arr1)).toBe(1);
    expect('' + em.randomArray(arr2)).toMatch(/1|5|10/);
    expect('' + em.randomArray(arr3)).toMatch(/abc|def|ghi|jkl/);
    expect('' + em.randomArray(arr4)).toMatch(/true|false/);
    expect('' + em.randomArray(arr5)).toMatch(/NaN|null|undefined/);
    expect('' + em.randomArray(arr6)).toMatch(/1|abc|true|null/);

  expect(em.randomArray([])).toBe(undefined)
  expect(() => em.randomArray(3)).toThrow();
  expect(() => em.randomArray(true)).toThrow();

  }

});

test ('em.randomBetween', () => {

  for (let i = 0; i < 1000; i++) {

    const a = em.randomBetween(1, 10);
    expect(a).toBeLessThan(10);
    expect(a).toBeGreaterThanOrEqual(1);

    const b = em.randomBetween(-4, 9);
    expect(b).toBeLessThan(9);
    expect(b).toBeGreaterThanOrEqual(-4);

    const c = em.randomBetween(2.54, 19.1);
    expect(c).toBeLessThan(19.1);
    expect(c).toBeGreaterThanOrEqual(2.54);


  expect(() => em.randomBetween(5, 2)).toThrow();
  expect(() => em.randomBetween("a", "b")).toThrow();
  expect(() => em.randomBetween(3, true)).toThrow();
  expect(() => em.randomBetween([1,2,3], 4)).toThrow();

  }

});

test ('em.sizeStrs', () => {

  expect(em.sizeStrs("Apple, Banana, Pineapple, Strawberry")).toBe(4);
  expect(em.sizeStrs(",,,,,")).toBe(6);
  expect(em.sizeStrs("abcd")).toBe(1);
  expect(em.sizeStrs("")).toBe(1);

  expect(() => em.sizeStrs(1)).toThrow();
  expect(() => em.sizeStrs([1,2,3])).toThrow();
  expect(() => em.sizeStrs(false)).toThrow();


});

test ('em.sortNum', () => {

  expect(em.sortNum("512, 123, 111, 6129, 13, 5")).toBe("\"5,13,111,123,512,6129\"")
  expect(em.sortNum("0")).toBe("\"0\"");

  expect(() => em.sortNum("")).toThrow();
  expect(() => em.sortNum("apple, pear, orange"));
  expect(() => em.sortNum(true)).toThrow();
  expect(() => em.sortNum(12, 14, 15, 9)).toThrow();
  expect(() => em.sortNum()).toThrow();

});

test ('em.getAV', () => {

  expect(em.getAV("1,2,3", 1)).toBe("1")
  expect(em.getAV("a,b,c", 2)).toBe("b")

  expect(() => em.getAV("a", 2)).toThrow();
  expect(() => em.getAV("a", 0)).toThrow();
  expect(() => em.getAV()).toThrow();
  expect(() => em.getAV(true)).toThrow();

});

test ('em.randomS', () => {

  for (let i = 0; i < 1000; i++) {

    expect("" + em.randomS(0, 3, 1)).toMatch(/0|2|3/);
    expect("" + em.randomS(0, 5, "1,2")).toMatch(/0|3|4|5/)
    expect("" + em.randomS(5)).toMatch(/0|1|2|3|4|5/);
    expect("" + em.randomS(10, 15)).toMatch(/10|11|12|13|14|15/);

    expect(() => em.randomS()).toThrow();
    expect(() => em.randomS("a")).toThrow();
    expect(() => em.randomS(false, true, 1)).toThrow();


  }

});

// TODO, unit test em.random with two negatives, with one negative one positive, with one
// or more arguments equalling zero, with decimal values.  Verify that it fails (by using
// expect.toThrow) when called with erroneous inputs (when lower greater than upper, when
// passing in string values)