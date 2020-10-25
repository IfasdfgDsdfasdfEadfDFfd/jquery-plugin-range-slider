import { actions, IRangeSliderStore } from '../reducer';
import { Provider, Store, View } from '../../core';
import { HiddenView } from '../../core/shortcuts';

import styles from '../../exports.scss';


class Track extends View {
  constructor(scale: TrackScale) {
    super({tag: 'div', attrs: {class: 'range-slider__track'}, children: [
      scale
    ]});
  }
}

class TrackScale extends HiddenView {
  hidingElementClassName = 'range-slider__track-scale--hidden';

  constructor() {
    super({tag: 'ul', attrs: { class: 'range-slider__track-scale' }, children: []});
  }

  update(values: number[]): void {
    const items = values.map((value, index) => {
      const percent = 100 / (values.length - 1) * index;

      const max = values[values.length - 1];
      const min = values[0];
      const ratio = (value - min) / (max - min);

      return this.createItem(value.toString(), percent, ratio);
    });


    this.replaceChildren(items);
  }

  createItem(value: string, percentOffset: number, ratio: number): TrackScaleItem {
    const item = new TrackScaleItem(value);
    const itemWidth = value.length * (parseInt(styles.rootFontSize)); // font size in pixels
    const thumbWidth = parseFloat(styles.thumbWidth) * parseInt(styles.rootFontSize);

    item.element.style.setProperty('width', `${itemWidth}px`);
    item.element.style.setProperty('left', `${percentOffset}%`);
    item.element.style.setProperty('margin-left', `${-(
      itemWidth / 2 - thumbWidth / 2 + thumbWidth * ratio
    )}px`);

    return item;
  }
}

class TrackScaleItem extends HiddenView {

  constructor(value = '') {
    const button = new View({tag: 'button', attrs: {class: 'range-slider__track-scale__button'}, children: [value]});
    super({tag: 'li', attrs: {
      class: 'range-slider__track-scale__item'}, children: [button],
    });

    this.hidingElementClassName = 'range-slider__track-scale__item--hidden';
  }
}

class RangeSliderTrack extends Provider<IRangeSliderStore, {
  track: Track,
  scale: TrackScale,
}> {
  private getSliderValues(state: IRangeSliderStore): number[] {
    const {min, max, step} = state;

    const length = (max - min) / step + 1;

    const values = Array(length)
      .fill(null)
      .map((_, index) => min + step * index);

    return values;
  }

  private makeOnClickHandler(store: Store<IRangeSliderStore>): (Event: MouseEvent) => void {
    return (event: MouseEvent) => {
      const target = event?.target as HTMLElement;

      if (target.nodeName === 'BUTTON') {
        store.dispatch({
          type: actions.CHANGE_RIGHT_VALUE,
          value: parseInt(target.textContent || ''),
        });
      }
    }
  }

  init(store: Store<IRangeSliderStore>): void {
    this.elements.scale = new TrackScale();
    this.elements.track = new Track(this.elements.scale);

    this.root = this.elements.track;

    this.elements.scale.element.addEventListener('click', this.makeOnClickHandler(store));
  }

  render(state: IRangeSliderStore): void {
    this.elements.scale.update(this.getSliderValues(state));
    this.elements.scale.hidden = !state.trackScaleVisibility;
  }
}


export {
  Track,
  TrackScale,
  TrackScaleItem,
  RangeSliderTrack,
}
