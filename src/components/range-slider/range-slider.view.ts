import { View } from '@core';
import { memo } from 'core/utils';

@memo({ methods: ['updateVerticalState', 'onWindowResize'] })
class RangeSlider extends View<RangeSliderProps> {
  attrs = {
    class: 'range-slider',
  };

  render({ isVertical, windowResizeHandler }: RangeSliderProps): void {
    this.onWindowResize(windowResizeHandler);
    this.updateVerticalState(isVertical);
  }

  onWindowResize(listener: EventListener): void {
    window.onresize = listener;
  }

  updateVerticalState(isVertical: boolean): void {
    this.nativeElement.classList.toggle('range-slider_vertical', isVertical);
  }
}

export { RangeSlider };
