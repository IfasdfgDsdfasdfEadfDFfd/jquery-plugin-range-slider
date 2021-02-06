import { Controller } from '@core';

class ScaleController extends Controller {
  mapState({ scale }: RangeSliderModelData): Partial<ScaleProps> {
    return {
      items: scale.values,
    };
  }
}

export { ScaleController };
