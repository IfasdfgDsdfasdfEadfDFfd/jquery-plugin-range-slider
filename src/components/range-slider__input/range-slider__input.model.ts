import { Model } from '@core';

class InputModel extends Model<InputModelData> {
  name = 'input';

  data = {
    min: 0,
    max: 0,
    values: [],
  };
}

export { InputModel };
