import { Controller } from '@core';

class InputController extends Controller {
  mapState({ min, max, value }: InputModelData): Partial<InputProps> {
    return { data: { min, max, value } };
  }

  mapDispatch(dispatch: ModelDispatch): Partial<InputProps> {
    return {
      valueChangeHandler(event) {
        const { value } = event.target as HTMLInputElement;
        // placeholder
        dispatch({ type: 'change', payload: value });
      },
    };
  }
}

export { InputController };
