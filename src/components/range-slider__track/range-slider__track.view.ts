import { actions, IRangeSliderStore } from '../reducer';
import { Provider, Store, View } from '../../core';
import { getOffset, HiddenView } from '../../core/shortcuts';

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
    const overflowRate = Math.ceil(values.reduce((sum, value) => {
      return sum + (value.toString().length * (parseInt(styles.rootFontSize) * 1.4));
    }, 0) / <number>this.element.clientWidth);

    const nextValues: number[] = [];
    for (let index = 0; index < values.length; index += overflowRate) {
      nextValues.push(values[index]);
    }
    nextValues[nextValues.length-1] = values[values.length-1];

    const items = nextValues.map(value => new TrackScaleItem(value.toString()));
    this.replaceChildren(items);

    items.forEach((item, index) => {
      const selfWidth = <number>item.element.clientWidth;
      const parentWidth = <number>this.element.clientWidth;

      const max = nextValues[nextValues.length-1];
      const min = nextValues[0];
      const value = nextValues[index];

      const offset = getOffset(selfWidth, parentWidth, value, max, min);

      item.element.style.setProperty('left', `${offset}%`);
    });
  }
}

class TrackScaleItem extends View {
  constructor(value = '') {
    const button = new View({tag: 'button', attrs: {class: 'range-slider__track-scale__button'}, children: [value]});
    super({tag: 'li', attrs: {
      class: 'range-slider__track-scale__item'}, children: [button],
    });
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
    this.elements.scale.hidden = state.trackScaleVisibility;
  }
}


export {
  Track,
  TrackScale,
  TrackScaleItem,
  RangeSliderTrack,
}
