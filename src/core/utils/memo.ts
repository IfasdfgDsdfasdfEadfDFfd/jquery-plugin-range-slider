import { deepEqual } from './deepEqual';

// eslint-disable-next-line fsd/hof-name-prefix
function memo<TArg, TResult>(targetFn: (arg: TArg) => TResult): MemoFunc<TArg, TResult> {
  let prevArg: TArg;
  let prevResult: TResult;

  return (arg: TArg): TResult => {
    if (!deepEqual(arg, prevArg)) {
      prevArg = arg;
      prevResult = targetFn(arg);
    }

    return prevResult;
  };
}

export { memo };
