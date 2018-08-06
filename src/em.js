const round = (num, decimalPositions) => {
  if (typeof num != 'number' || typeof decimalPositions != 'number') {
    throw "Input must be a number.";
  }
  if (decimalPositions < 0 || decimalPositions % 1 != 0) {
    throw "decimalPositions must be >= 0 and be an integer.";
  }
  var m = Math.pow(10, decimalPositions);
  return Math.round(num * m) / m;
};

const linSearch = (arr, key) => {
  newArr = arr.split(',')
  for (let i = 0; i < arr.length; i++) {
    if (newArr[i] == key) return key;
  }
  return null;
};

const random = (lower, upper, decimalPositions = 0) => {
  
  if (lower === undefined) {
    return Math.random();
  }
  else if (lower > upper) {
    throw "Lower is greater than upper.";
  }
  else if (typeof lower != 'number' || typeof upper != 'number' || typeof decimalPositions != 'number') {
    throw "Inputs must be numbers.";
  }
  else if (decimalPositions === 0) {
    // Return random integer value beween lower and upper, exluding upper,
    // but including lower
    return Math.floor(Math.random() * (upper - lower)) + lower;
  } 
  else {

    // Random random decimal value between lower and upper, excluding upper,
    // but including lower - truncated to a certain number of decimals

    if (decimalPositions < 1 || decimalPositions % 1 !== 0) { // Checks for negatives and decimals.
      throw "decimalPosition has to be non-negative and an integer";
    }

    const value = (Math.random() * (upper - lower)) + lower;
    const result = '' + value;
    const dot = result.lastIndexOf('.');

    if (dot === -1) {
      return Number(result);
    } else {
      return Number(result.substr(0, dot + (decimalPositions + 1)));
    }
  }

};

const randomInt = (min, max) => {

  if (typeof min != 'number' || typeof max != 'number') {
    throw "Inputs must be numbers.";
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const almostEqual = (a, b, difference = 10 ** -7) => {
  if (typeof a != 'number' || typeof b != 'number' || typeof difference != 'number') throw "Inputs must be numbers.";
  return Math.abs(a-b) < difference;
};

const em = {
  almostEqual,
  
  fracA2: (n, d) => {
    return n + ',' + d;
},
  frac2Tex: (n, d) => '\\frac{' + n + '}{' + d + '}',

  abs: (x) => {
    if (typeof x == 'number') return Math.abs(x);
    else throw "Input must be a number.";
  },

  ceil: (x) => {
    if (typeof x == 'number') return Math.ceil(x); 
    else throw "Input must be a number.";
  },

  floor: (x) => {
    if (typeof x == 'number') return Math.floor(x); 
    else throw "Input must be a number.";
  },

  factorial: (n) => {
    if (typeof n != 'number') throw "Input must be a number.";
    else if (n % 1 != 0 || n < 0) throw "Input must be a non-negative integer."
    let result = 1;
    for (let i = n; i > 0; i--) {
      result = result * i;
    }
    return result;
  },

  gcd: (x, y) => {
    if (typeof x != 'number' || typeof y != 'number') throw "Inputs must be numbers.";
    else if (x < 0 || y < 0 || x % 1 != 0 || y % 1 != 0) throw "Inputs must be non-negative integers."
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  },

  log: (n, base = Math.E) => {
    if (typeof n != 'number' || typeof base != 'number') throw "Inputs must be numbers.";
    else if (n <= 0) throw "log(" + n + ") is undefined.";
    else if (base <= 0) throw "base must be positive.";
    else return (Math.log(n) / Math.log(base));
  },

  max: (a, b) =>  {
    if (typeof a != 'number' || typeof b != 'number') throw "Inputs must be numbers.";
    else return Math.max(a, b);
  },

  min: (a, b) =>  {
    if (typeof a != 'number' || typeof b != 'number') throw "Inputs must be numbers.";
    else return Math.min(a, b);
  },

  sqrt: (n) =>  {
    if (typeof n != 'number') throw "Input must be a number.";
    else if (n < 0) throw "Input must be non-negative.";
    else return Math.sqrt(n);
  },

  sin: (x) =>  {
    if (typeof x != 'number') throw "Input must be a number.";
    else return Math.sin(x);
  },

  cos: (x) =>  {
    if (typeof x != 'number') throw "Input must be a number.";
    else return Math.cos(x);
  },

  tan: (x) =>  {
    if (typeof x != 'number') throw "Input must be a number.";
    else if (almostEqual(em.cos(x), 0)) throw "tan(" + x + ") is undefined.";
    else return Math.tan(x);
  },

  PI: Math.PI,

  exp: (x) =>  { 
    if (typeof x != 'number') throw "Input must be a number.";
    else return Math.exp(x);
  },

  pow: (x, y) => {
    if (typeof x != 'number' || typeof y != 'number') throw "Inputs must be numbers.";
    var result = Math.pow(x, y);
    if (isNaN(result)) throw "Result is not a real number.";
    return result;

  },
  toRadians: (d) => {
    if (typeof d != 'number') throw "Input must be a number.";
    return d * (Math.PI / 180)
  },
  sizeStrs: (arr) => arr.split(',').length,
  mod: (a, b) => {
    if (typeof a != 'number' || typeof b != 'number') throw "Inputs must be numbers."
    return a % b;
  },
  getAV: (arr, index) => {
    if (index > arr.split(',').length || index < 1) throw "n must be in between 1 and the length of the collection."
    if (arr.startsWith('\"')) {
      return arr.substring(1, arr.length - 2).split(',')[index + 1];
    }
    return arr.split(',')[index - 1];
  },
  randomArray: (arr) => {
    if (arr instanceof Array) return arr[randomInt(0, arr.length)];
    throw "Input must be an array.";
  },
  randomBetween: (l, u) => {
    if (typeof l != 'number' || typeof u != 'number') throw "Inputs must be numbers.";
    else if (l > u) throw "u must be greater than or equal to l"
    return (Math.random() * (u - l)) + l
  },

  randomS: (lower, upper, except) => {
    if (lower > upper) throw "lower must be less than upper";
    else if (typeof lower != 'number' || (typeof upper != 'number' && typeof upper == undefined)) throw "lower & upper must be numbers.";
    if (upper == undefined) {
      upper = lower
      lower = 0
    };
    let item = null;
    let count = 0;
    except = "" + except
    do {
      item = em.randomInt(lower, upper + 1);
      count = count + 1
    } while (linSearch(except, item + "") != null || count <= (upper - lower));
    if (linSearch(except, item + "") != null) return null
    return item;
  },

  random,

  randomInt,

  round: (number, decimalPositions = 1) => {
    return round(number, decimalPositions);
  },
  roundA: (number, decimalPositions) => {
    return round(number, decimalPositions);
  },
  sortNum: (arr) => {

    if (arr.length == 0) throw "arr must contain at least one number.";

    if (arr.startsWith('\"')) {
      arr = arr.substring(1, arr.length - 2).split(',');
    } else {
      arr = arr.split(',');
    }
    return '"' + arr.map(n => Number(n)).sort((a,b) => a-b).join(',') + '"';
  }
};

module.exports = {
  em,
};
