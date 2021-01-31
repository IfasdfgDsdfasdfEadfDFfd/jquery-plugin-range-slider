/* eslint-disable fsd/hof-name-prefix */
import { deepEqual } from './deepEqual';

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

function memoDecor(
  _targetFn: unknown,
  _propertyKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: TypedPropertyDescriptor<any>,
): void {
  descriptor.value = memo(descriptor.value);
}

export { memo, memoDecor };
