import { memo, deepEqual } from 'core/utils';

describe('utils module', () => {
  test('memo()', () => {
    const testFn = jest.fn();
    const memoArgs = [true, 'string', 100];
    const memoFn = memo(testFn);

    expect(memoFn).not.toBe(testFn);
    expect(testFn.mock.calls.length).toEqual(0);

    memoFn(...memoArgs);
    expect(testFn.mock.calls.length).toEqual(1);
    expect(testFn.mock.calls[0]).toEqual(memoArgs);

    memoFn(...memoArgs);
    expect(testFn.mock.calls.length).toEqual(1);

    const newArg = 123;
    memoFn(newArg);
    expect(testFn.mock.calls.length).toEqual(2);
    expect(testFn.mock.calls[1]).toEqual([newArg]);

    memoFn(newArg);
    expect(testFn.mock.calls.length).toEqual(2);

    // without args
    memoFn();
    expect(testFn.mock.calls.length).toEqual(3);
    expect(testFn.mock.calls[2].length).toEqual(0);

    memoFn();
    expect(testFn.mock.calls.length).toEqual(3);
  });

  describe('deepEqual()', () => {
    test('non equal types', () => {
      expect(deepEqual(true, 1)).toBeFalsy();
      expect(deepEqual('string', 1)).toBeFalsy();
      expect(deepEqual(true, 'string')).toBeFalsy();
    });

    test('digits equality', () => {
      expect(deepEqual(1, 1)).toBeTruthy();
      expect(deepEqual(0, 1)).toBeFalsy();
      expect(deepEqual(-10, 10)).toBeFalsy();
    });

    test('string equality', () => {
      expect(deepEqual('abc', 'abc')).toBeTruthy();
      expect(deepEqual('cda', 'abc')).toBeFalsy();
    });

    test('boolean equality', () => {
      expect(deepEqual(true, true)).toBeTruthy();
      expect(deepEqual(false, false)).toBeTruthy();
      expect(deepEqual(false, true)).toBeFalsy();
      expect(deepEqual(true, false)).toBeFalsy();
    });

    test('array equality', () => {
      expect(deepEqual([], [])).toBeTruthy();
      expect(deepEqual([], [1, 2, 3])).toBeFalsy();
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
      expect(deepEqual([true, false], [true, false])).toBeTruthy();
      expect(deepEqual(['string'], ['string'])).toBeTruthy();
      expect(deepEqual([true, false, 'string'], [1, 2, 3])).toBeFalsy();
    });

    test('null equality', () => {
      expect(deepEqual(null, null)).toBeTruthy();
      expect(deepEqual(null, 'string')).toBeFalsy();
      expect(deepEqual(null, {})).toBeFalsy();
    });

    test('undefined values', () => {
      expect(deepEqual(undefined, undefined)).toBeTruthy();
      expect(deepEqual(undefined, null)).toBeFalsy();
      expect(deepEqual(undefined, 'undefined')).toBeFalsy();
    });

    test('object equality', () => {
      expect(deepEqual({}, {})).toBeTruthy();
      expect(deepEqual({}, { a: 'string' })).toBeFalsy();
      expect(deepEqual({ a: 'string' }, {})).toBeFalsy();

      expect(deepEqual({ a: 1 }, { a: 1 })).toBeTruthy();
      expect(deepEqual({ a: 1 }, { b: 1 })).toBeFalsy();

      expect(
        deepEqual({ a: [true, false] }, { a: [true, false] }),
      ).toBeTruthy();
      expect(deepEqual({ a: [false, true] }, { a: [true, false] })).toBeFalsy();

      expect(
        deepEqual(
          { a: [{ a: true }, 'string', 123] },
          { a: [{ a: true }, 'string', 123] },
        ),
      ).toBeTruthy();

      expect(
        deepEqual(
          { a: [{ a: true }, 'string', 123] },
          { a: [{ a: false }, 'another string', 321] },
        ),
      ).toBeFalsy();
    });
  });
});
