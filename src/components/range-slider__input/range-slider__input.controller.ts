import { Controller } from '@core';

class InputController extends Controller {
  mapState({ common, input }: RangeSliderModelData): DeepPartial<InputProps> {
    return {
      itemProps: {
        elementProps: {
          min: input.min,
          max: input.max,
          value: input.values[0],
        },

        thumbProps: {
          color: common.color,
          markerText: 'marker text',
        },
      },
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
