const trip = require('../src/trip');

test('test trip class with proposed values 1', () => {
  const tests = [10,20,30];
  const tr = new trip(tests.length);
  for ( let v of tests ) {
    tr.expense = v;
  }
  expect(tr.rest).toBe('10.00');
});

test('test trip class with proposed values 2', () => {
  const tests = [15,15.01,3,3.01];
  const tr = new trip(tests.length);
  for ( let v of tests ) {
    tr.expense = v;
  }
  expect(tr.rest).toBe('12.00');
});

test('test trip class with proposed values 3', () => {
  const tests = [15,14.99,3,2.99];
  const tr = new trip(tests.length);
  for ( let v of tests ) {
    tr.expense = v;
  }
  expect(tr.rest).toBe('12.00');
});

test('test trip class with proposed values 4', () => {
  const tests = [999.1,999.1,999,999.1];
  const tr = new trip(tests.length);
  for ( let v of tests ) {
    tr.expense = v;
  }
  expect(tr.rest).toBe('0.07');
});

test('test trip class with proposed values 5', () => {
  const tests = [100.01,99.99,99.99];
  const tr = new trip(tests.length);
  for ( let v of tests ) {
    tr.expense = v;
  }
  expect(tr.rest).toBe('0.01');
});