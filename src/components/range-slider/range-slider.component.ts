import { Component } from '@core';

import { RangeSliderController } from './range-slider.controller';
import { RangeSliderModel } from './range-slider.model';
import { RangeSlider } from './range-slider.view';

class RangeSliderComponent extends Component {
  view = new RangeSlider();
  model = new RangeSliderModel();
  controller = new RangeSliderController();
}

export { RangeSliderComponent };
