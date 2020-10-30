import { Provider, Store, View } from '../../core';
import {
  LeftRangeSliderInputRange,
  RightRangeSliderInputRange,
} from '../range-slider__input-range';
import { RangeSliderProgress } from '../range-slider__progress';
import { RangeSliderTrack } from '../range-slider__track';
import { IRangeSliderState } from '../reducer';

import './range-slider.styles.scss';

class RangeSliderElement extends View {
  constructor(
    leftInput: LeftRangeSliderInputRange,
    rightInput: RightRangeSliderInputRange,
    track: RangeSliderTrack,
    progress: RangeSliderProgress,
  ) {
    super({
      tag: 'div',
      attrs: { class: 'range-slider' },
      children: [leftInput.root, rightInput.root, track.root, progress.root],
    });
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

class RangeSlider extends Provider<
  IRangeSliderState,
  {
    slider: RangeSliderElement;
    leftInput: LeftRangeSliderInputRange;
    rightInput: RightRangeSliderInputRange;
    track: RangeSliderTrack;
    progress: RangeSliderProgress;
  }
> {
  init(store: Store<IRangeSliderState>): void {
    (this.elements.leftInput = new LeftRangeSliderInputRange(store)),
      (this.elements.rightInput = new RightRangeSliderInputRange(store)),
      (this.elements.track = new RangeSliderTrack(store)),
      (this.elements.progress = new RangeSliderProgress(store)),
      (this.elements.slider = new RangeSliderElement(
        this.elements.leftInput,
        this.elements.rightInput,
        this.elements.track,
        this.elements.progress,
      ));

    this.root = this.elements.slider;

    // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
    window.addEventListener('resize', () =>
      this.onWindowResize(store.getState()),
    );
  }

  render(state: IRangeSliderState): void {
    this.elements.slider.vertical = state.vertical;
    this.elements.slider.hasMarker = state.markerVisibility;
  }

  onWindowResize(state: IRangeSliderState): void {
    this.elements.track.render(state);
    this.elements.leftInput.elements.thumb.positionCorrection();
    this.elements.rightInput.elements.thumb.positionCorrection();
  }
}

export { RangeSlider };
