import { Controller } from '@core';

class RangeSliderController extends Controller {
  mapState({ root }: RangeSliderModelData): Partial<RangeSliderProps> {
    return {
      isVertical: root.isVertical,
    };
  }

  mapDispatch(): Partial<RangeSliderProps> {
    return {
      windowResizeHandler(event: Event): void {
        console.log('some event', event);
      },
    };
  }
}

export { RangeSliderController };
