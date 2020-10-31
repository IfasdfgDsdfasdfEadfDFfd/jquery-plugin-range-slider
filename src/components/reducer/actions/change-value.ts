import { makeValue } from './common';

const CHANGE_LEFT_VALUE = '@CHANGE_LEFT_VALUE';
const CHANGE_RIGHT_VALUE = '@CHANGE_RIGHT_VALUE';

const getValue = (
  value: number,
  min: number,
  max: number,
  step: number,
): [number, number] => {
  const leftValue = parseLeftValue(value, min, max);
  const rightValue = parseRightValue(value, min, max);

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
