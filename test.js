const Decimal = require('decimal.js');

Decimal.set({precision: 3});

const a = new Decimal(5);

console.log(a.add(3.5455), 5+3.5455);