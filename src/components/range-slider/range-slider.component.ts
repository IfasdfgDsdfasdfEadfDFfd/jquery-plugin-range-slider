import { Component } from '@core';
import { InputComponent } from 'components/range-slider__input';
import { TrackComponent } from 'components/range-slider__track';

import { RangeSliderController } from './range-slider.controller';
import { RangeSliderModel } from './range-slider.model';
import { RangeSlider } from './range-slider.view';

class RangeSliderComponent extends Component {
  view = new RangeSlider();
  model = new RangeSliderModel();
  controller = new RangeSliderController();
  childComponents = [new InputComponent(), new TrackComponent()];
}

export { RangeSliderComponent };
