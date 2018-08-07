const round = (num, decimalPositions) => {
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
  if (decimalPositions === 0) {
    // Return random integer value beween lower and upper, exluding upper,
    // but including lower
    return Math.floor(Math.random() * (upper - lower)) + lower;
  } 
  else {

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

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const almostEqual = (a, b, difference = 10 ** -7) => {
  return Math.abs(a-b) < difference;
};

const em = {
  almostEqual,
  
  fracA2: (n, d) => {
    return n + ',' + d;
},
  frac2Tex: (n, d) => '\\frac{' + n + '}{' + d + '}',

  abs: (x) => Math.abs(x),

  ceil: (x) => Math.ceil(x),

  floor: (x) => Math.floor(x),

  factorial: (n) => {
    let result = 1;
    for (let i = n; i > 0; i--) {
      result = result * i;
    }
    return result;
  },

  gcd: (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  },

  log: (n, base = Math.E) => (Math.log(n) / Math.log(base)),

  max: (a, b) => Math.max(a, b),

  min: (a, b) => Math.min(a, b),

  sqrt: (n) => Math.sqrt(n),

  sin: (x) =>  {
    return Math.sin(x);
  },

  cos: (x) =>  {
    return Math.cos(x);
  },

  tan: (x) =>  {
    return Math.tan(x);
  },

  PI: Math.PI,

  exp: (x) =>  { 
    return Math.exp(x);
  },

  pow: (x, y) => {
    return Math.pow(x, y);
  },
  toRadians: (d) => {
    return d * (Math.PI / 180)
  },
  sizeStrs: (arr) => arr.split(',').length,
  mod: (a, b) => {
    return a % b;
  },
  getAV: (arr, index) => {
    if (arr.startsWith('\"')) {
      return arr.substring(1, arr.length - 2).split(',')[index + 1];
    }
    return arr.split(',')[index - 1];
  },
  randomArray: (arr) => {
    return arr[randomInt(0, arr.length)];
  },
  randomBetween: (l, u) => {
    return (Math.random() * (u - l)) + l
  },

  randomS: (lower, upper, except) => {
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
