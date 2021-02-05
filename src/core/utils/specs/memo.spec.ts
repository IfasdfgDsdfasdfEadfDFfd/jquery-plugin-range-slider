import { memo } from 'core/utils';

describe('memo class decorator', () => {
  const testArg = 'awesome stuff';
  let testInstance: TestClass;

  let memoSpy: jest.Mock;
  let ordinarySpy: jest.Mock;

  @memo(['memoMethod'])
  class TestClass {
    constructor(public memoSpy: jest.Mock, public ordinarySpy: jest.Mock) {}

    memoMethod(arg: unknown) {
      this.memoSpy();
      return arg;
    }

    ordinaryMethod(arg: unknown) {
      this.ordinarySpy();
      return arg;
    }
  }

  beforeEach(() => {
    memoSpy = jest.fn();
    ordinarySpy = jest.fn();

    testInstance = new TestClass(memoSpy, ordinarySpy);
    // call both methods
    testInstance.memoMethod(testArg);
    testInstance.ordinaryMethod(testArg);
  });

  test("don't call memoMethod with same args", () => {
    expect(memoSpy).toHaveBeenCalledTimes(1);
    testInstance.memoMethod(testArg);
    expect(memoSpy).toHaveBeenCalledTimes(1);
  });

  test("don't call memoMethod with same args", () => {
    expect(ordinarySpy).toHaveBeenCalledTimes(1);
    testInstance.ordinaryMethod(testArg);
    expect(ordinarySpy).toHaveBeenCalledTimes(2);
  });

  test('memorize target method args', () => {
    const prevArgs = Object.getOwnPropertyDescriptor(testInstance, 'memos')?.value['memoMethod']
      .prevArgs;
    expect(prevArgs).toEqual([testArg]);
  });

  test('memorize target method result', () => {
    const prevResult = Object.getOwnPropertyDescriptor(testInstance, 'memos')?.value['memoMethod']
      .prevResult;
    expect(prevResult).toEqual(testArg);
  });
});
