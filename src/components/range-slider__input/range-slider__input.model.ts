import { Model } from '@core';
import { makeValueMultipleBy } from 'core/utils';

class InputModel extends Model<InputModelData> {
  name = 'input';

  data = {
    min: 0,
    max: 1,
    step: 1,
    values: [0, 1],
  };

  reducerCases = {
    [INPUT_ACTIONS.CHANGE_MIN]: changeMin,
    [INPUT_ACTIONS.CHANGE_MAX]: changeMax,
    [INPUT_ACTIONS.CHANGE_STEP]: changeStep,
    [INPUT_ACTIONS.CHANGE_VALUE]: changeInputValue,
  };
}

enum INPUT_ACTIONS {
  CHANGE_MIN = '@CHANGE_MIN',
  CHANGE_MAX = '@CHANGE_MAX',
  CHANGE_STEP = '@CHANGE_STEP',
  CHANGE_VALUE = '@CHANGE_VALUE',
}

const changeMin: ModelReducerCase<InputModelData, number> = (data, min) => {
  min = makeValueMultipleBy(min, data.step);
  min = Math.min(min, data.max);

  const values = data.values.map(value => (value < min ? min : value));

  return { ...data, min, values };
};

const changeMax: ModelReducerCase<InputModelData, number> = (data, max) => {
  max = makeValueMultipleBy(max, data.step);
  max = Math.max(max, data.min);

  const values = data.values.map(value => (value > max ? max : value));

  return { ...data, max, values };
};

const changeStep: ModelReducerCase<InputModelData, number> = (data, step) => {
  const max = makeValueMultipleBy(data.max, step);
  const min = makeValueMultipleBy(data.min, step);

  return { ...data, min, max, step };
};

const changeInputValue: ModelReducerCase<InputModelData, { index: number; value: number }> = (
  data,
  { index, value },
) => {
  value = Math.min(Math.max(value, data.min), data.max);

  const leftValues = data.values
    .slice(0, index)
    .map(leftValue => (leftValue > value ? value : leftValue));

  const rightValues = data.values
    .slice(index + 1, data.values.length)
    .map(rightValue => (rightValue < value ? value : rightValue));

  const values = [...leftValues, value, ...rightValues];

  return { ...data, values };
};

export { InputModel, INPUT_ACTIONS, changeInputValue, changeMin, changeMax, changeStep };
