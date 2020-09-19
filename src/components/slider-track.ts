import { View } from '../core';


export class SliderTrack extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__track'}});
  }
}
