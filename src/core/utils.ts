type cb = (value: number) => string;
const makeValueLikeCallback = (value: string | cb): cb => {
  return typeof value === 'function' ? value : () => value;
};

const memo = (fn: Function, args: any[]) => {
  return (...newArgs: any[]) => {
    if (args.some(value => !newArgs.includes(value))) {
      fn(newArgs);
    }
  };
};

export { makeValueLikeCallback, memo, cb };
