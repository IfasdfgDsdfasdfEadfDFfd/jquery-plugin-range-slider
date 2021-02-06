import { Component } from '@core';

import { InputController } from './range-slider__input.controller';
import { InputModel } from './range-slider__input.model';
import { Input } from './range-slider__input.view';

class InputComponent extends Component {
  view = new Input();
  model = new InputModel();
  controller = new InputController();
}

export { InputComponent };
