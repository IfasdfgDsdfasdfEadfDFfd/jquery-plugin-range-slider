/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fsd/hof-name-prefix */
import { deepEqual } from './deepEqual';

function memo(methods: string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends { new (...args: any[]): {} }>(constructor: T): T {
    methods.forEach(methodName => {
      const originalMethod = constructor.prototype[methodName];

      // create memo version of the original method
      Object.defineProperty(constructor.prototype, methodName, {
        value: function (...args: any[]) {
          if (!deepEqual(this.memos[methodName].prevArgs, args)) {
            this.memos[methodName].prevArgs = args;
            this.memos[methodName].prevResult = originalMethod.apply(this, args);
          }

          return this.memos[methodName].prevResult;
        },
      });
    });

    // return mixin class with cached values
    return class extends constructor {
      memos = methods.reduce((memos, methodName) => {
        return {
          ...memos,
          [methodName]: {
            prevArgs: undefined,
            prevResult: undefined,
          },
        };
      }, {});
    };
  };
}

export { memo };
