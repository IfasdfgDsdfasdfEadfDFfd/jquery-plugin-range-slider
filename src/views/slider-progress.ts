import { View } from '../core';


export class SliderProgress extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__progress'}});
  }

  set value({min, max, value}: {min: number, max: number, value: number}) {
    const percent = (value - min) / (max - min) * 100;
    this.element.style.right = `${100 - percent}%`;
  }
}
