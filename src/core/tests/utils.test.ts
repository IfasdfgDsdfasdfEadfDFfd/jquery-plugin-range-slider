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
  });
});
