/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fsd/hof-name-prefix */
import { deepEqual } from './deepEqual';

function memo(methods: string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function <T extends { new (...newArgs: any[]): {} }>(constructor: T): T {
    methods.forEach(methodName => {
      const originalMethod = constructor.prototype[methodName];

      // create memo version of the original method
      Object.defineProperty(constructor.prototype, methodName, {
        value: function (...newArgs: any[]) {
          let index = this.memos[methodName].prevArgs.findIndex((prev: any) =>
            deepEqual(prev, newArgs),
          );

          // caching new newArgs and result
          if (index === -1) {
            this.memos[methodName].prevArgs.push(newArgs);
            const newResult = originalMethod.apply(this, newArgs);
            index = this.memos[methodName].prevResults.push(newResult) - 1;
          }

          return this.memos[methodName].prevResults[index];
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
