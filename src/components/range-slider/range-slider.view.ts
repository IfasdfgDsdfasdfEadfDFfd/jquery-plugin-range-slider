import { Provider, Store, View } from '@core';
import { IRangeSliderStoreState } from '@store';
import {
  RangeSliderLeftInput,
  RangeSliderRightInput,
} from 'components/range-slider__input-range';
import { RangeSliderProgress } from 'components/range-slider__progress';
import { RangeSliderTrack } from 'components/range-slider__track';
import { useMemo } from 'core/utils';

class RangeSliderElement extends View {
  constructor({
    leftInput,
    rightInput,
    track,
    progress,
  }: {
    leftInput: RangeSliderLeftInput;
    rightInput: RangeSliderRightInput;
    track: RangeSliderTrack;
    progress: RangeSliderProgress;
  }) {
    super({
      tag: 'div',
      attrs: { class: 'range-slider' },
      children: [leftInput.root, rightInput.root, track.root, progress.root],
    });
  }

  set vertical(value: boolean) {
    const className = 'range-slider--vertical';
    this.nativeElement.classList.toggle(className, value);
  }

  set hasMarker(value: boolean) {
    const className = 'range-slider--has-marker';
    this.nativeElement.classList.toggle(className, value);
  }
}

class RangeSlider extends Provider<
  IRangeSliderStoreState,
  {
    slider: RangeSliderElement;
    leftInput: RangeSliderLeftInput;
    rightInput: RangeSliderRightInput;
    track: RangeSliderTrack;
    progress: RangeSliderProgress;
  }
> {
  init(store: Store<IRangeSliderStoreState>): void {
    this.elements.leftInput = new RangeSliderLeftInput(store);
    this.elements.rightInput = new RangeSliderRightInput(store);
    this.elements.track = new RangeSliderTrack(store);
    this.elements.progress = new RangeSliderProgress(store);

    this.elements.slider = new RangeSliderElement({
      leftInput: this.elements.leftInput,
      rightInput: this.elements.rightInput,
      track: this.elements.track,
      progress: this.elements.progress,
    });

    this.root = this.elements.slider;

    window.addEventListener(
      'resize',
      this.makeRangeSliderWindowResizeHandler(store),
    );

    store.subscribe(
      useMemo(
        ({ vertical }) => vertical,
        isVertical => (this.elements.slider.vertical = isVertical),
      ),
    );

    store.subscribe(
      useMemo(
        ({ markerVisibility }) => markerVisibility,
        hasMarker => (this.elements.slider.hasMarker = hasMarker),
      ),
    );
  }

  makeRangeSliderWindowResizeHandler(
    store: Store<IRangeSliderStoreState>,
  ): () => void {
    return () => {
      const { min, max, value } = store.getState();

      this.elements.leftInput.elements.thumb.setOffset({
        min,
        max,
        value: value[0],
      });
      this.elements.rightInput.elements.thumb.setOffset({
        min,
        max,
        value: value[1],
      });
    };
  }
}

export { RangeSlider };
