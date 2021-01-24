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

export { makeValueLikeCallback, memo, useMemo, cb };
