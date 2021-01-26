type cb = (value: string | number) => string;
const makeValueLikeCallback = (value: string | cb): cb => {
  return typeof value === 'function' ? value : () => value;
};

const memo = (fn: Function) => {
  let prevArgs: any[] = [];
  return (...nextArgs: any[]) => {
    if (!deepEqual(nextArgs, prevArgs)) {
      prevArgs = nextArgs;
      fn(...nextArgs);
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

  if (elm1 === null) return elm1 === elm2;
  if (typeof elm1 === 'undefined') return elm1 === elm2;

  if (['boolean', 'string', 'number'].includes(typeof elm1)) {
    return elm1 === elm2;
  }

  if (Array.isArray(elm1)) {
    if (elm1.length !== elm2.length) return false;
    return elm1.every((val, index) => deepEqual(val, elm2[index]));
  }

  if (typeof elm1 === 'object') {
    if (Object.keys(elm1).length !== Object.keys(elm2).length) return false;
    return Object.keys(elm1).every(key => deepEqual(elm1[key], elm2[key]));
  }

  return false;
};

export { makeValueLikeCallback, memo, useMemo, deepEqual, cb };
