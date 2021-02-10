import { Component } from '@core';
import { InputComponent } from 'components/range-slider__input';
import { ScaleComponent } from 'components/range-slider__scale';
import { ThumbComponent } from 'components/range-slider__thumb';
import { TrackComponent } from 'components/range-slider__track';

import { RangeSliderController } from './range-slider.controller';
import { RangeSliderModel } from './range-slider.model';
import { RangeSlider } from './range-slider.view';

class RangeSliderComponent extends Component {
  view = new RangeSlider();
  model = new RangeSliderModel();
  controller = new RangeSliderController();
  childComponents = [
    new InputComponent(),
    new TrackComponent(),
    new ThumbComponent(),
    new ScaleComponent(),
  ];
}

export { RangeSliderComponent };
