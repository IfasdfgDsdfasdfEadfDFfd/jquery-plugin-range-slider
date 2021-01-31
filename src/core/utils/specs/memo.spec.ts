import { memo } from 'core/utils';

describe('memo func', () => {
  let testFn: jest.Mock;
  let memoFn: MemoFunc<unknown, unknown>;

  beforeEach(() => {
    testFn = jest.fn();
    testFn.mockReturnValue('return value');
    memoFn = memo(testFn);
  });

  const testMemoFn = (arg: unknown) => {
    const result = memoFn(arg);
    const callTimes = testFn.mock.calls.length;
    expect(testFn).toHaveBeenLastCalledWith(arg);

    // check that calling func again has no effect
    const memoResult = memoFn(arg);
    expect(testFn).toHaveBeenCalledTimes(callTimes);
    expect(memoResult).toEqual(result);
  };

  test('creating memoFn does not calling its', () => {
    expect(testFn).not.toHaveBeenCalled();
  });

  test('memorize target with args', () => {
    testMemoFn('string');
    testMemoFn(123);
    testMemoFn(true);
    testMemoFn(undefined);
    testMemoFn([true, 123, 'string', null, { a: 'some thing' }]);
  });
});
