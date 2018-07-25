const em = require('../src/em').em;

for (let i = 0; i < 1000; i++) {
  const v = em.random(4, 6);
  if (v == 6) {
    console.log('failed');
  } 
}