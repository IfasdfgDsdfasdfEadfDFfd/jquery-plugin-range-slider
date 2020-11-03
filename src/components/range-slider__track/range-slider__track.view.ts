import { actionNames, IRangeSliderState } from '../reducer';
import { Provider, Store, View } from '../../core';
import { HiddenView } from '../../core/shortcuts';

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

class TrackScale extends HiddenView {
  hidingElementClassName = 'range-slider__track-scale--hidden';

  constructor() {
    super({
      tag: 'ul',
      attrs: { class: 'range-slider__track-scale' },
      children: [],
    });
  }

  update(values: string[]): void {
    let overflowRate = Math.ceil(
      values.reduce((sum, value) => {
        return sum + value.length * (parseInt(styles.rootFontSize) * 1.4);
      }, 0) / <number>this.element.clientWidth,
    );

    while ((values.length - 1) % overflowRate !== 0 && overflowRate < 100) {
      overflowRate += 1;
    }

    const items = values
      .map((value, index) => {
        const percent = (100 / (values.length - 1)) * index;

        const max = values.length - 1;
        const min = 0;
        const ratio = (index - min) / (max - min);

        return this.createItem(value, percent, ratio);
      })
      .filter((_, index) => {
        return index % overflowRate === 0;
      });

    this.replaceChildren(items);
  }

  createItem(
    value: string,
    percentOffset: number,
    ratio: number,
  ): TrackScaleItem {
    const item = new TrackScaleItem(value);
    const itemWidth = value.length * parseInt(styles.rootFontSize);
    const thumbWidth =
      parseFloat(styles.thumbWidth) * 0.8 * parseInt(styles.rootFontSize) -
      parseInt(styles.thumbBorderWidth);

    item.element.style.setProperty('width', `${itemWidth}px`);
    item.element.style.setProperty('left', `${percentOffset}%`);
    item.element.style.setProperty(
      'margin-left',
      `${-(itemWidth / 2 - thumbWidth / 2 + thumbWidth * ratio)}px`,
    );

    return item;
  }
}

class TrackScaleItem extends HiddenView {
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

    this.hidingElementClassName = 'range-slider__track-scale__item--hidden';
  }
}

class RangeSliderTrack extends Provider<
  IRangeSliderState,
  {
    track: Track;
    scale: TrackScale;
  }
> {
  private makeOnClickHandler(
    store: Store<IRangeSliderState>,
  ): (Event: MouseEvent) => void {
    return (event: MouseEvent) => {
      const target = event?.target as HTMLElement;
      const text = target.textContent || '';
      const { prefix, value } = store.getState();
      const nextValue = Number(text.substr(prefix.length));

      const actionName =
        Math.abs(value[0] - nextValue) > Math.abs(value[1] - nextValue)
          ? actionNames.CHANGE_RIGHT_VALUE
          : actionNames.CHANGE_LEFT_VALUE;

      if (target.nodeName === 'BUTTON') {
        store.dispatch({
          name: actionName,
          value: nextValue,
        });
      }
    };
  }

  init(store: Store<IRangeSliderState>): void {
    this.elements.scale = new TrackScale();
    this.elements.track = new Track(this.elements.scale);

    this.root = this.elements.track;

    this.elements.scale.element.addEventListener(
      'click',
      this.makeOnClickHandler(store),
    );
  }

  render(state: IRangeSliderState): void {
    this.elements.scale.update(getSliderValues(state));
    this.elements.scale.hidden = !state.trackScaleVisibility;
  }
}

const getSliderValues = (state: IRangeSliderState): string[] => {
  const { max, min, step, prefix } = state;
  const length = Math.round((max - min) / step + 1);

  const values = Array(length)
    .fill(null)
    .map((_, index) => Number((min + step * index).toFixed(1)))
    .map(value => `${prefix}${value}`);

  return values;
};

export { Track, TrackScale, TrackScaleItem, RangeSliderTrack, getSliderValues };
