import { memo } from 'core/utils';

describe('utils module', () => {
  test('memo()', () => {
    const testFn = jest.fn();
    const memoArgs = [true, 'string', 100];
    const memoFn = memo(testFn, memoArgs);

    expect(memoFn).not.toBe(testFn);
    expect(testFn.mock.calls.length).toEqual(0);

    memoFn(...memoArgs);
    expect(testFn.mock.calls.length).toEqual(0);

    memoFn();
    expect(testFn.mock.calls.length).toEqual(1);
  });
});
