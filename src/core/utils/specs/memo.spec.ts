import { memo } from 'core/utils';

describe('memo decorator', () => {
  let spyFn: jest.Mock;

  class Test {
    property = 111;

    @memo
    method(...args: unknown[]): number {
      spyFn(...args);
      return this.property;
    }
  }

  let testClass: Test;

  beforeEach(() => {
    spyFn = jest.fn();
    testClass = new Test();
  });

  const testMemo = (arg: unknown) => {
    const result = testClass.method(arg);
    const callTimes = spyFn.mock.calls.length;
    expect(spyFn).toHaveBeenLastCalledWith(arg);

    // check that calling func again has no effect
    const memoResult = testClass.method(arg);
    expect(spyFn).toHaveBeenCalledTimes(callTimes);
    expect(memoResult).toEqual(result);
  };

  test('creating memo method does not calling its', () => {
    expect(spyFn).not.toHaveBeenCalled();
  });

  test('memorize target method args', () => {
    testMemo('string');
    testMemo(123);
    testMemo(true);
    testMemo(undefined);
    testMemo([true, 123, 'string', null, { a: 'some thing' }]);
  });
});
