import { IRangeSliderStore } from '../reducer';
import { Provider, View } from '../../core';


export class Progress extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__progress'}, children: []});
  }

  set value({min, max, value}: {min: number, max: number, value: [number, number]}) {
    const leftOffset = (value[0] - min) / (max - min) * 100;
    const rightOffset = (value[1] - min) / (max - min) * 100;

    this.element.style.left = `${leftOffset}%`;
    this.element.style.right = `${100 - rightOffset}%`;
  }
}


interface TElements {
  progress: Progress;
}

export class RangeSliderProgress extends Provider<IRangeSliderStore, TElements> {
  init(): void {
    this.elements.progress = new Progress();
    this.root = this.elements.progress;
  }

  render(state: IRangeSliderStore): void {
    const {min, max} = state;
    let {value} = state;

    if (!state.intervalMode) {
      value = [min, value[1]];
    }

    this.elements.progress.value = {min, max , value};
  }
}
