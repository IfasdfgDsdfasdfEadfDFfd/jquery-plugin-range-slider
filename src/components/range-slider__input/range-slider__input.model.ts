import { Model } from '@core';

class InputModel extends Model {
  name = 'input';

  data = {
    min: 0,
    max: 10,
    values: [5, 7],
  };
}

export { InputModel };
