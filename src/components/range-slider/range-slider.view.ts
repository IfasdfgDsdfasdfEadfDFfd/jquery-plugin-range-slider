import { View } from '@core';

class RangeSlider extends View<RangeSliderProps> {
  attrs = {
    class: 'range-slider',
  };

  render({ windowResizeHandler }: RangeSliderProps): void {
    this.onWindowResize(windowResizeHandler);
  }

  onWindowResize(listener: EventListener): void {
    window.addEventListener('resize', listener);
  }
}

export { RangeSlider };
