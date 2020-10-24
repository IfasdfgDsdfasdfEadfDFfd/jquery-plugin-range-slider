import { actions, IRangeSliderStore } from '../reducer';
import { Provider, Store, View } from '../../core';

import styles from '../../exports.scss';


class Track extends View {
  constructor(scale: TrackScale) {
    super({tag: 'div', attrs: {class: 'range-slider__track'}, children: [
      scale
    ]});
  }
}

class TrackScale extends View {
  constructor() {
    super({tag: 'ul', attrs: { class: 'range-slider__track-scale' }, children: []});
  }

  update(values: string[]): void {

    const overflowRate = Math.ceil((values.length * parseInt(styles.minScaleItemWidth)) / this.element.clientWidth);

    if (overflowRate > 1) {
      const filteredValues = [];
      for (let index = values.length - 1; index >= 0; index -= overflowRate) {
        if (overflowRate / index > 1) {
          index = 0;
        }

        filteredValues.unshift(values[index]);
      }

      this.replaceChildren(filteredValues.map(value => new TrackScaleItem(value)));
    } else {
      this.replaceChildren(values.map(value => new TrackScaleItem(value)));
    }
  }
}

class TrackScaleItem extends View {
  constructor(value = '') {
    super({tag: 'li', attrs: {
      class: 'range-slider__track-scale__item'}, children: [value],
    });
  }
}

class RangeSliderTrack extends Provider<IRangeSliderStore, {
  track: Track,
  scale: TrackScale,
}> {
  private getSliderValues(state: IRangeSliderStore): string[] {
    const {min, max, step} = state;

    const length = (max - min) / step + 1;

    const values = Array(length)
      .fill(null)
      .map((_, index) => min + step * index)
      .map(String);

    return values;
  }

  private makeOnWindowResizeHandler(state: IRangeSliderStore): () => void {
    return () => this.elements.scale.update(this.getSliderValues(state));
  }

  private makeOnClickHandler(store: Store<IRangeSliderStore>): (Event: MouseEvent) => void {
    return (event: MouseEvent) => {
      const target = event?.target as HTMLElement;

      if (target.nodeName === 'LI') {
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

    window.addEventListener('resize', this.makeOnWindowResizeHandler(store.getState()));

    this.elements.scale.element.addEventListener('click', this.makeOnClickHandler(store));
  }

  render(state: IRangeSliderStore): void {
    this.elements.scale.update(this.getSliderValues(state));
  }
}


export {
  Track,
  TrackScale,
  TrackScaleItem,
  RangeSliderTrack,
}
