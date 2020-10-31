import { makeValue } from './common';

const CHANGE_MIN = '@CHANGE_MIN';

const getMin = (value: number, max: number, step: number): number => {
  const min = Math.min(value, max);
  return makeValue(min).multipleBy(step);
};

export { CHANGE_MIN, getMin };
