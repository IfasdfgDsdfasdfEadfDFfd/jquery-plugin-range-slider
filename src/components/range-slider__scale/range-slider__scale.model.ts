import { Model } from '@core';

class ScaleModel extends Model<ScaleModelData> {
  name = 'scale';

  data = {
    values: [],
  };
}

export { ScaleModel };
