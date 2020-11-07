import { actionNames, IRangeSliderState } from '../reducer';
import { Provider, Store, View } from '../../core';

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

  update(values: [number, string][]): void {
    const items = values.map(([index, value]) => {
      const percent = (100 / values[values.length - 1][0]) * index;

      const max = values[values.length - 1][0];
      const min = 0;
      const ratio = (index - min) / (max - min);

      return this.createItem(value, percent, ratio);
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
      parseFloat(styles.thumbWidth) * parseInt(styles.rootFontSize) -
      parseInt(styles.thumbBorderWidth);

    item.element.style.setProperty('width', `${itemWidth}px`);
    item.element.style.setProperty('left', `${percentOffset}%`);
    item.element.style.setProperty(
      'margin-left',
      `${-(itemWidth / 2 - thumbWidth / 2 + thumbWidth * ratio)}px`,
    );

    item.onMouseIn(() => (item.hovered = true));
    item.onMouseOut(() => (item.hovered = false));
    item.onFocusIn(() => (item.focused = true));
    item.onFocusOut(() => (item.focused = false));

    return item;
  }

  set activeColor(value: string) {
    this.children.forEach(child => {
      (child as TrackScaleItem).color = value;
    });
  }
}

class TrackScaleItem extends View {
  lastColor: string;

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
    this.lastColor = '';
  }

  set color(value: string) {
    this.lastColor = value;
    this.resetColor();
  }

  onFocus(): void {
    this.resetColor();
  }

  onHover(): void {
    this.resetColor();
  }

  resetColor(): void {
    if (this.isFocused || this.isHovered)
      this.element.style.setProperty('color', this.lastColor);
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
      const { prefix, postfix, value, intervalMode } = store.getState();

      const nextValue = Number(
        text.substr(
          prefix.length,
          text.length - prefix.length - postfix.length,
        ),
      );

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
    this.elements.scale.activeColor = state.primaryColor;
  }
}

const getSliderValues = (state: IRangeSliderState): [number, string][] => {
  const { max, min, step, prefix, postfix } = state;
  const length = Math.round((max - min) / step + 1);
  const lastIndex = length - 1;

  const primes = [3, 5, 7, 11];

  const delimiter = getDelimiter(lastIndex, primes);

  let multiplier = Math.max(Math.floor(lastIndex / delimiter), 1);
  multiplier = multiplier < 15 ? Math.min(multiplier, delimiter) : multiplier;

  const values = new Array(Math.ceil(length / multiplier))
    .fill(null)
    .map((_, index) => [index, step * index * multiplier + min])
    .map(([index, value]) => [index, `${prefix}${value}${postfix}`]);

  return values as [number, string][];
};

const getDelimiter = (dividend: number, delimiters: number[]): number => {
  for (const delimiter of delimiters) {
    if (dividend % delimiter === 0) {
      return delimiter;
    }
  }

  return getDelimiter(dividend - 1, delimiters);
};

export { Track, TrackScale, TrackScaleItem, RangeSliderTrack, getSliderValues };
