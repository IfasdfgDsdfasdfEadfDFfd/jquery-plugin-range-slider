import { isArray } from 'jquery';

type cb = (value: number) => string;
const makeValueLikeCallback = (value: string | cb): cb => {
  return typeof value === 'function' ? value : () => value;
};

const memo = (fn: Function) => {
  let prevArgs: any[] = [];
  return (...nextArgs: any[]) => {
    if (nextArgs.length) {
      if (nextArgs.some(value => !prevArgs.includes(value))) {
        prevArgs = nextArgs;
        fn(...nextArgs);
      }
    } else {
      if (prevArgs.length) {
        prevArgs = nextArgs;
        fn();
      }
    }
  };
};

function useMemo<TValue, TResult>(
  destructor: (value: TValue) => TResult,
  callback: (value: TResult) => void,
) {
  const memoFn = memo(callback);
  return (value: TValue) => {
    const result = destructor(value);
    memoFn(result);
  };
}

const deepEqual = (elm1: any, elm2: any): boolean => {
  if (typeof elm1 !== typeof elm2) return false;

  if (['boolean', 'string', 'number'].includes(typeof elm1)) {
    return elm1 === elm2;
  }

  if (Array.isArray(elm1)) {
    return elm1.every((val, index) => deepEqual(val, elm2[index]));
  }
};

export { makeValueLikeCallback, memo, useMemo, deepEqual, cb };
