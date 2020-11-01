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
  leftValue = parseLeftValue(leftValue, min, max);
  rightValue = parseRightValue(rightValue, leftValue, max);

  return [
    makeValue(leftValue).multipleBy(step),
    makeValue(rightValue).multipleBy(step),
  ];
};

const parseLeftValue = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const parseRightValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(value, min));

export { CHANGE_LEFT_VALUE, CHANGE_RIGHT_VALUE, getValue };
