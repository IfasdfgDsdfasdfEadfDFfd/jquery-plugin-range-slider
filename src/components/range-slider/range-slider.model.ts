import { Model } from '@core';

class RangeSliderModel extends Model<RootModelData> {
  name = 'root';

  data = {
    color: '',
    isVertical: false,
    ratio: 0,
  };
}

export { RangeSliderModel };
