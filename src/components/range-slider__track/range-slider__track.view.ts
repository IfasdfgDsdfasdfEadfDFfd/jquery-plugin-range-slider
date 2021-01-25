import { Provider, Store, View } from '@core';
import { actionNames, IRangeSliderStoreState } from '@store';
import { useMemo } from 'core/utils';

import styles from '../../exports.scss';

class Track extends View {
  constructor(scale: TrackScale) {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__track' },
      children: [scale],
    });
  }
}

class TrackScale extends View {
  hidingClassName = 'range-slider__track-scale--hidden';

  constructor() {
    super({
      tag: 'ul',
      attrs: { class: 'range-slider__track-scale' },
      children: [],
    });
  }

  update(values: sliderValue[]): void {
    const items = values.map(({ index, displayValue }) => {
      const percent = (100 / values[values.length - 1].index) * index;

      const max = values[values.length - 1].index;
      const min = 0;
      const ratio = (index - min) / (max - min);

      return this.createItem({
        ratio,
        value: displayValue,
        offsetInPercentages: percent,
        maxWidthInPixels: Math.round(
          this.nativeElement.clientWidth / values.length,
        ),
      });
    });

    this.replaceChildren(items);
  }

  createItem({
    value,
    ratio,
    maxWidthInPixels,
    offsetInPercentages,
  }: {
    value: string;
    ratio: number;
    maxWidthInPixels: number;
    offsetInPercentages: number;
  }): TrackScaleItem {
    const item = new TrackScaleItem(value);
    const itemWidth = Math.min(
      value.length * (parseInt(styles.rootFontSize) * 0.5),
      maxWidthInPixels,
    );
    const thumbWidth =
      parseFloat(styles.thumbWidth) * parseInt(styles.rootFontSize) -
      parseInt(styles.thumbBorderWidth);

    item.nativeElement.style.setProperty('width', `${itemWidth}px`);
    item.nativeElement.style.setProperty('left', `${offsetInPercentages}%`);
    item.nativeElement.style.setProperty(
      'margin-left',
      `${-(itemWidth / 2 - thumbWidth / 2 + thumbWidth * ratio)}px`,
    );

    item.handleViewMouseIn(() => (item.hovered = true));
    item.handleViewMouseOut(() => (item.hovered = false));
    item.handleViewFocusIn(() => (item.focused = true));
    item.handleViewFocusOut(() => (item.focused = false));

    return item;
  }

  set activeColor(value: string) {
    this.nativeElement.style.setProperty('color', value);
  }
}

class TrackScaleItem extends View {
  constructor(value = '') {
    const button = new View({
      tag: 'button',
      attrs: { class: 'range-slider__track-scale__button' },
      children: [value],
    });
    super({
      tag: 'li',
      attrs: {
        class: 'range-slider__track-scale__item',
      },
      children: [button],
    });

    this.hidingClassName = 'range-slider__track-scale__item--hidden';
  }
}

class RangeSliderTrack extends Provider<
  IRangeSliderStoreState,
  {
    track: Track;
    scale: TrackScale;
  }
> {
  cachedSliderValues: sliderValue[] = [];

  init(store: Store<IRangeSliderStoreState>): void {
    this.elements.scale = new TrackScale();
    this.elements.track = new Track(this.elements.scale);

    this.root = this.elements.track;

    this.elements.scale.nativeElement.addEventListener(
      'click',
      this.makeRangeSliderTrackClickHandler(store),
    );

    store.subscribe(
      useMemo(
        ({ trackScaleVisibility }) => trackScaleVisibility,
        isVisible => {
          this.elements.scale.visible = isVisible;
        },
      ),
    );

    store.subscribe(
      useMemo(
        ({ primaryColor }) => primaryColor,
        color => {
          this.elements.scale.activeColor = color;
        },
      ),
    );

    store.subscribe(
      useMemo<IRangeSliderStoreState, any>(
        state => ({
          from: state.min,
          to: state.max,
          step: state.step,
          prefix: state.prefix,
          postfix: state.postfix,
          fixedValues: state.fixedValues,
        }),
        ({ from, to, step, prefix, postfix, fixedValues }) => {
          if (fixedValues.length) {
            this.cachedSliderValues = fixedValues
              .slice()
              .map((value: any, index: number) => ({
                index,
                rawValue: index,
                displayValue: value,
              }));
          } else {
            this.cachedSliderValues = this.getRange({
              from,
              to,
              step,
              prefix,
              postfix,
            });
          }

          this.elements.scale.update(this.cachedSliderValues);
        },
      ),
    );
  }

  render(_: IRangeSliderStoreState): void {}

  makeRangeSliderTrackClickHandler(
    store: Store<IRangeSliderStoreState>,
  ): (Event: MouseEvent) => void {
    return (event: MouseEvent) => {
      const target = event?.target as HTMLElement;
      const text = target.textContent || '';
      const { value, intervalMode } = store.getState();

      let nextValue = this.cachedSliderValues[0].rawValue;
      for (const sliderValue of this.cachedSliderValues) {
        if (sliderValue.displayValue === text) {
          nextValue = sliderValue.rawValue;
          break;
        }
      }

      const actionName = intervalMode
        ? Math.abs(value[0] - nextValue) >= Math.abs(value[1] - nextValue)
          ? actionNames.CHANGE_RIGHT_VALUE
          : actionNames.CHANGE_LEFT_VALUE
        : actionNames.CHANGE_RIGHT_VALUE;

      if (target.nodeName === 'BUTTON') {
        store.dispatch({
          name: actionName,
          value: nextValue,
        });
      }
    };
  }

  getRange({
    from,
    to,
    step,
    prefix,
    postfix,
  }: {
    from: number;
    to: number;
    step: number;
    prefix: IRangeSliderStoreState['prefix'];
    postfix: IRangeSliderStoreState['postfix'];
  }): sliderValue[] {
    const accuracy = (step.toString().split('.')[1] || '').length;

    const length = Math.round((to - from) / step + 1);
    const lastIndex = length - 1;

    const primes = [3, 5, 7, 11];

    const delimiter = this.getDelimiter(lastIndex, primes);

    let multiplier = Math.max(Math.floor(lastIndex / delimiter), 1);
    multiplier = multiplier < 15 ? Math.min(multiplier, delimiter) : multiplier;

    const values = new Array(Math.ceil(length / multiplier))
      .fill(null)
      .map((_, index) => [
        index,
        Number((step * index * multiplier + from).toFixed(accuracy)),
      ])
      .map(([index, value]) => ({
        index,
        rawValue: value,
        displayValue: `${prefix(value)}${value}${postfix(value)}`,
      }));

    return values as sliderValue[];
  }

  getDelimiter(dividend: number, delimiters: number[]): number {
    for (const delimiter of delimiters) {
      if (dividend % delimiter === 0) {
        return delimiter;
      }
    }

    return this.getDelimiter(dividend - 1, delimiters);
  }
}

interface sliderValue {
  index: number;
  rawValue: number;
  displayValue: string;
}

export { Track, TrackScale, TrackScaleItem, RangeSliderTrack };
