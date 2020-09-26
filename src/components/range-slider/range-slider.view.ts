import { Provider, Store, View } from '../../core';
import {
  LeftRangeSliderInputRange,
  RightRangeSliderInputRange,
} from '../range-slider__input-range';
import { RangeSliderProgress } from '../range-slider__progress';
import { RangeSliderTrack } from '../range-slider__track';
import { IRangeSliderStore } from '../reducer';

import './range-slider.styles.scss';


export class RangeSliderElement extends View {
  constructor(
    leftInput: LeftRangeSliderInputRange,
    rightInput: RightRangeSliderInputRange,
    track: RangeSliderTrack,
    progress: RangeSliderProgress,
  ) {
    super({tag: 'div', attrs: {class: 'range-slider'}, children: [
      leftInput.root,
      rightInput.root,
      track.root,
      progress.root,
    ]});
  }

  set vertical(value: boolean) {
    const className = 'range-slider--vertical';
    this.element.classList.toggle(className, value);
  }

  set hasMarker(value: boolean) {
    const className = 'range-slider--has-marker';
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
    );

    this.root = this.elements.slider;
  }

  render(state: IRangeSliderStore) {
    this.elements.slider.vertical = state.vertical;
    this.elements.slider.hasMarker = state.markerVisibility;
  }
}
