import { deepEqual } from '../deepEqual';

describe('deepEqual', () => {
  test('comparison of atomic values', () => {
    expect(deepEqual(undefined, undefined)).toBeTruthy();
    expect(deepEqual(undefined, 'undefined')).toBeFalsy();
    expect(deepEqual(undefined, 123)).toBeFalsy();
    expect(deepEqual(undefined, false)).toBeFalsy();

    expect(deepEqual('string', 'string')).toBeTruthy();
    expect(deepEqual('string', 'string2')).toBeFalsy();
    expect(deepEqual('string', 123)).toBeFalsy();
    expect(deepEqual('string', true)).toBeFalsy();

    expect(deepEqual(123, 123)).toBeTruthy();
    expect(deepEqual(123, 456)).toBeFalsy();
    expect(deepEqual(123, true)).toBeFalsy();

    expect(deepEqual(true, true)).toBeTruthy();
    expect(deepEqual(true, false)).toBeFalsy();
  });

  test('comparison funcs', () => {
    const func = () => 'some value';
    const funcRef = func;
    expect(deepEqual(func, func)).toBeTruthy();
    expect(deepEqual(func, funcRef)).toBeTruthy();
  });

  test('comparison NaN values', () => {
    expect(deepEqual(NaN, NaN)).toBeTruthy();
    expect(deepEqual(NaN, 123)).toBeFalsy();
  });

  test('comparison null values', () => {
    expect(deepEqual(null, null)).toBeTruthy();
    expect(deepEqual(null, undefined)).toBeFalsy();
  });

  test('comparison of complex data structures', () => {
    const arrayA = [
      'string',
      true,
      Infinity,
      123,
      234,
      undefined,
      null,
      { a: ['string2', NaN], b: { c: ['string3'] } },
    ];

    const arrayB = [
      'string',
      true,
      Infinity,
      123,
      234,
      undefined,
      null,
      { a: ['string2', 234], b: { c: ['string3'] } },
    ];

    expect(deepEqual(arrayA, arrayA)).toBeTruthy();
    expect(deepEqual(arrayA, arrayB)).toBeFalsy();
  });
});
