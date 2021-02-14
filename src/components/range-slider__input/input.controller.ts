import { Controller } from '@core';
import { INPUT_ACTIONS } from './input.model';

class InputController extends Controller {
  mapState({ input }: RangeSliderModelData): Partial<InputProps> {
    return input;
  }

  mapDispatch({ inputDispatch: dispatch }: Record<string, ModelDispatch>): Partial<InputProps> {
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
