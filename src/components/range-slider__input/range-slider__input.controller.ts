import { Controller } from '@core';

class InputController extends Controller {
  mapState({ common }: RangeSliderModelData): Partial<InputProps> {
    return {
      color: common.color,
    };
  }

  mapDispatch(dispatch: ModelDispatch): Partial<InputProps> {
    return {
      valueChangeHandler(event: InputEvent) {
        const { value } = event.target as HTMLInputElement;
        // placeholder
        dispatch({ type: 'change', payload: value });
      },
    };
  }
}

export { InputController };
