import { Controller } from '@core';
import { INPUT_ACTIONS } from './range-slider__input.model';

class InputController extends Controller {
  mapState({ input }: RangeSliderModelData): Partial<InputProps> {
    return input;
  }

  mapDispatch(dispatch: ModelDispatch): Partial<InputProps> {
    return {
      valueChangeHandler(index, value) {
        dispatch({
          type: INPUT_ACTIONS.CHANGE_VALUE,
          payload: { index, value },
        });
      },
    };
  }
}

export { InputController };
