import { Component } from '@core';

import { Thumb } from './range-slider__thumb.view';
import { ThumbModel } from './range-slider__thumb.model';
import { ThumbController } from './range-slider__thumb.controller';

class ThumbComponent extends Component {
  view = new Thumb();
  model = new ThumbModel();
  controller = new ThumbController();
}

export { ThumbComponent };
