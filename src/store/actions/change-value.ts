import { makeValue } from './common';

const CHANGE_LEFT_VALUE = '@CHANGE_LEFT_VALUE';
const CHANGE_RIGHT_VALUE = '@CHANGE_RIGHT_VALUE';

const getValue = (
  leftValue: number,
  rightValue: number,
  min: number,
  max: number,
  step: number,
): [number, number] => {
  const nextLeftValue = parseLeftValue(leftValue, min, rightValue);
  const nextRightValue = parseRightValue(rightValue, leftValue, max);

  return [makeValue(nextLeftValue).multipleBy(step), makeValue(nextRightValue).multipleBy(step)];
};

const parseLeftValue = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const parseRightValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(value, min));

export { CHANGE_LEFT_VALUE, CHANGE_RIGHT_VALUE, getValue };
