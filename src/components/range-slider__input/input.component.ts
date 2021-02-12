import { Component } from '@core';

import { InputController } from './input.controller';
import { InputModel } from './input.model';
import { Input } from './input.view';

class InputComponent extends Component {
  view = new Input();
  model = new InputModel();
  controller = new InputController();
}

export { InputComponent };
