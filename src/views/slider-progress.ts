import { View } from '../core';


export class SliderProgress extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__progress'}});
  }

  set value({min, max, value}: {min: number, max: number, value: [number, number]}) {
    const leftOffset = (value[0] - min) / (max - min) * 100;
    const rightOffset = (value[1] - min) / (max - min) * 100;

    this.element.style.left = `${leftOffset}%`;
    this.element.style.right = `${100 - rightOffset}%`;
  }
}
