import { memo } from 'core/utils';

describe('memo class decorator', () => {
  const testArg = 'awesome stuff';
  let testInstance: TestClass;

  let memoSpy: jest.Mock;
  let ordinarySpy: jest.Mock;

  @memo({ methods: ['memoMethod'], cacheSize: Infinity })
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
      .prevArgs[0];
    expect(prevArgs).toEqual([testArg]);
  });

  test('memorize target method result', () => {
    const prevResult = Object.getOwnPropertyDescriptor(testInstance, 'memos')?.value['memoMethod']
      .prevResults[0];
    expect(prevResult).toEqual(testArg);
  });

  test('repetitive calls', () => {
    const first = 'first';
    const second = 'second';

    const firstResult = testInstance.memoMethod(first);
    expect(memoSpy).toHaveBeenCalledTimes(2);

    const secondResult = testInstance.memoMethod(second);
    expect(memoSpy).toHaveBeenCalledTimes(3);
    expect(firstResult).not.toEqual(secondResult);

    const cachedFirstResult = testInstance.memoMethod(first);
    expect(memoSpy).toHaveBeenCalledTimes(3);
    expect(firstResult).toEqual(cachedFirstResult);

    const cachedSecondResult = testInstance.memoMethod(second);
    expect(memoSpy).toHaveBeenCalledTimes(3);
    expect(secondResult).toEqual(cachedSecondResult);
  });
});
