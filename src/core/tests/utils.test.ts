import { memo } from 'core/utils';

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
});
