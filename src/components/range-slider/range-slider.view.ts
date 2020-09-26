import { Provider, Store, View } from '../../core';
import {
  LeftRangeSliderInputRange,
  RightRangeSliderInputRange,
} from '../range-slider__input-range';
import { RangeSliderProgress } from '../range-slider__progress';
// import { LeftRangeSliderThumb, RightRangeSliderThumb } from '../range-slider__thumb';
import { RangeSliderTrack } from '../range-slider__track';
 import { IRangeSliderStore } from '../reducer';

import './range-slider.styles.scss';


export class RangeSliderElement extends View {
  constructor(
    leftInput: LeftRangeSliderInputRange,
    rightInput: RightRangeSliderInputRange,
    track: RangeSliderTrack,
    progress: RangeSliderProgress,
    // leftThumb: LeftRangeSliderThumb,
    // rightThumb: RightRangeSliderThumb,
  ) {
    super({tag: 'div', attrs: {class: 'range-slider'}, children: [
      leftInput.root,
      rightInput.root,
      track.root,
      progress.root,
      // leftThumb.root,
      // rightThumb.root,
    ]});
  }

  set vertical(value: boolean) {
    const className = 'range-slider--vertical';
    this.element.classList.toggle(className, value);
  }
}


export class RangeSlider extends Provider<IRangeSliderStore, {slider: RangeSliderElement}> {
  init(store: Store<IRangeSliderStore>) {
    this.elements.slider = new RangeSliderElement(
      new LeftRangeSliderInputRange(store),
      new RightRangeSliderInputRange(store),
      new RangeSliderTrack(store),
      new RangeSliderProgress(store),
      // new LeftRangeSliderThumb(store),
      // new RightRangeSliderThumb(store),
    );

    this.root = this.elements.slider;
  }

  render(state: IRangeSliderStore) {
    this.elements.slider.vertical = state.vertical;
  }
}
