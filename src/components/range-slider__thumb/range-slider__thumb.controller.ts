import { Controller } from '@core';

class ThumbController extends Controller {
  mapState({ root, input }: RangeSliderModelData): ThumbProps {
    const { min, max, values } = input;

    return {
      markerText: values[0].toString(),
      color: root.color,
      positionOffset: this.calcPositionOffset({ min, max, value: values[0] }),
    };
  }

  calcPositionOffset({ min, max, value }: { min: number; max: number; value: number }): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export { ThumbController };
