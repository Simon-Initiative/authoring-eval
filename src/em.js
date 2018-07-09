const round = (num, decimalPositions) => {
  var m = Math.pow(10, decimalPositions);
  return Math.round(num * m) / m;
};

const random = (lower, upper, decimalPositions = 0) => {
  return lower === undefined
    ? Math.random()
    : round((Math.random() * (upper - lower)) + lower, decimalPositions);
};

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const em = {
  fracA2: (n, d) => n + ',' + d,
  frac2Tex: (n, d) => '\\frac{' + n + '}{' + d + '}',
  abs: (v) => Math.abs(v),
  ceil: (v) => Math.ceil(v),
  floor: (v) => Math.floor(v),
  factorial: (v) => {
    let result = 1;
    for (let i = v; i > 0; i--) {
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
  log: (a) => Math.log(a),
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b),
  sqrt: (x) => Math.sqrt(x),
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  PI: Math.PI,
  exp: (x) => Math.exp(x),
  pow: (x, y) => Math.pow(x, y),
  toRadians: (d) => d * (Math.PI / 180),
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
  randomArray: (arr) => arr[randomInt(0, arr.length)],
  randomBetween: (l, u) => (Math.random() * (u - l)) + l,
  randomS: (lower, upper, except) => {
    let item = null;
    let count = 0;
    do {
      item = round((Math.random() * (upper - lower)) + lower, 0);
      count = count + 1;
    } while (except.indexOf(',' + item + ',') >= 0 && count <= (upper - lower));
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
};

module.exports = {
  em,
};
