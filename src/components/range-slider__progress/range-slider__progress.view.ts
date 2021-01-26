import { Provider, Store, View } from '@core';
import { IRangeSliderStoreState } from '@store';
import { useMemo } from 'core/utils';

class Progress extends View {
  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__progress' },
      children: [],
    });
  }

  set values({
    min,
    max,
    value,
  }: {
    min: number;
    max: number;
    value: [number, number];
  }) {
    const leftOffset = ((value[0] - min) / (max - min)) * 100;
    const rightOffset = ((value[1] - min) / (max - min)) * 100;

    this.nativeElement.style.left = `${leftOffset}%`;
    this.nativeElement.style.right = `${100 - rightOffset}%`;
  }

  set primaryColor(value: string) {
    this.nativeElement.style.setProperty('background-color', value);
  }
}

interface TElements {
  progress: Progress;
}

class RangeSliderProgress extends Provider<IRangeSliderStoreState, TElements> {
  init(store: Store<IRangeSliderStoreState>): void {
    this.elements.progress = new Progress();
    this.root = this.elements.progress;

    store.subscribe(
      useMemo(
        ({ min, max, value, intervalMode }) => {
          if (!intervalMode) {
            value = [min, value[1]];
          }

          return { min, max, value };
        },
        props => (this.elements.progress.values = props),
      ),
    );

    store.subscribe(
      useMemo(
        ({ primaryColor }) => primaryColor,
        color => (this.elements.progress.primaryColor = color),
      ),
    );
  }

  render(_: IRangeSliderStoreState): void {}
}

export { Progress, RangeSliderProgress };
