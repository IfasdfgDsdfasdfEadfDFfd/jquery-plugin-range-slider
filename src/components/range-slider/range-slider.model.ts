import { Model } from '@core';

class RangeSliderModel extends Model<RootModelData> {
  name = 'root';

  data = {
    color: '',
    ratio: 0,
  };
}

export { RangeSliderModel };
