import { Component } from '@core';

import { ScaleController } from './range-slider__scale.controller';
import { ScaleModel } from './range-slider__scale.model';
import { Scale } from './range-slider__scale.view';

class ScaleComponent extends Component {
  view = new Scale();
  model = new ScaleModel();
  controller = new ScaleController();
}

export { ScaleComponent };
