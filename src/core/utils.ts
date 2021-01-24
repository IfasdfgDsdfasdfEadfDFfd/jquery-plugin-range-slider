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

export { makeValueLikeCallback, memo, cb };
