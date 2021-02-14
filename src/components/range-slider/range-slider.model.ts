import { Model } from '@core';

class RangeSliderModel extends Model<RootModelData> {
  name = 'root';

  data = {
    color: '',
    isVertical: false,
    ratio: 0,
  };

  reducerCases = {
    [RANGE_SLIDER_ACTIONS.CHANGE_IS_VERTICAL]: changeIsVertical,
  };
}

enum RANGE_SLIDER_ACTIONS {
  CHANGE_IS_VERTICAL = '@CHANGE_IS_VERTICAL',
}

const changeIsVertical: ModelReducerCase<RootModelData, boolean> = (data, isVertical) => {
  return { ...data, isVertical };
};

export { RangeSliderModel, RANGE_SLIDER_ACTIONS, changeIsVertical };
