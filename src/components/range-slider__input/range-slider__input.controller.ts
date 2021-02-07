import { Controller } from '@core';

class InputController extends Controller {
  mapState({ input }: RangeSliderModelData): Partial<InputProps> {
    return input;
  }
}

export { InputController };
