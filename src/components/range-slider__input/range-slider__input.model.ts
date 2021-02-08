import { Model } from '@core';

enum INPUT_ACTIONS {
  CHANGE_VALUE = '@CHANGE_VALUE',
}

const changeInputValue: ModelReducerCase<InputModelData, { index: number; value: number }> = (
  data,
  { index, value },
) => {
  data.values[index] = value;
  return data;
};

class InputModel extends Model<InputModelData> {
  name = 'input';

  data = {
    min: 0,
    max: 0,
    values: [],
  };

  reducerCases = {
    [INPUT_ACTIONS.CHANGE_VALUE]: changeInputValue,
  };
}

export { InputModel, INPUT_ACTIONS };
