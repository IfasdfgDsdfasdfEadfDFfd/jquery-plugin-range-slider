/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fsd/hof-name-prefix */
import { deepEqual } from './deepEqual';

function memo({ methods, cacheSize = 1 }: { methods: string[]; cacheSize?: number }) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends { new (...newArgs: any[]): {} }>(constructor: T): T {
    methods.forEach(methodName => {
      const originalMethod = constructor.prototype[methodName];

      // create memo version of the original method
      Object.defineProperty(constructor.prototype, methodName, {
        value: function (...newArgs: any[]) {
          const prevArgs = this.memos[methodName].prevArgs;
          const prevResults = this.memos[methodName].prevResults;

          let index = prevArgs.findIndex((prev: any) => deepEqual(newArgs, prev));

          // caching new newArgs and result
          if (index === -1) {
            if (prevArgs.length === cacheSize) {
              prevArgs.splice(0, 1);
              prevResults.splice(0, 1);
            }

            prevArgs.push(newArgs);
            const newResult = originalMethod.apply(this, newArgs);
            index = prevResults.push(newResult) - 1;
          }

          return prevResults[index];
        },
      });
    });

    // return mixin class with cached values
    return class extends constructor {
      memos = methods.reduce((memos, methodName) => {
        return {
          ...memos,
          [methodName]: {
            prevArgs: [],
            prevResults: [],
          },
        };
      }, {});
    };
  };
}

export { memo };
