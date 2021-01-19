import { makeValue } from './common';

const CHANGE_MAX = '@CHANGE_MAX';

const getMax = (value: number, min: number, step: number): number => {
  const max = Math.max(value, min);
  return makeValue(max).multipleBy(step);
};

export { CHANGE_MAX, getMax };
