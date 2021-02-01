/* eslint-disable fsd/hof-name-prefix */
import { deepEqual } from './deepEqual';

function memo(
  _target: unknown,
  _propertyKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor: TypedPropertyDescriptor<any>,
): void {
  let prevArgs: unknown;
  let prevResult: unknown;

  const method = descriptor.value;

  descriptor.value = function (...args: unknown[]): unknown {
    if (!deepEqual(args, prevArgs)) {
      prevArgs = args;
      prevResult = method.apply(this, args);
    }

    return prevResult;
  };
}

export { memo };
