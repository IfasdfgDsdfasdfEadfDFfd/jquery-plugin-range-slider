import { actions, IRangeSliderStore } from '../reducer';
import { Provider, Store, View } from '../../core';

import styles from '../../exports.scss';


export class Track extends View {
  constructor(scale: TrackScale) {
    super({tag: 'div', attrs: {class: 'range-slider__track'}, children: [
      scale
    ]});
  }
}

export class TrackScale extends View {
  constructor() {
    super({tag: 'ul', attrs: { class: 'range-slider__track__scale' }});
  }

  update(values: string[]) {

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

export class TrackScaleItem extends View {
  constructor(value = '') {
    super({tag: 'li', attrs: {
      class: 'range-slider__track__scale__item'}, children: [value],
    });
  }
}


export class RangeSliderTrack extends Provider<IRangeSliderStore, {
  track: Track,
  scale: TrackScale,
}> {
  private getSliderValues(state: IRangeSliderStore): string[] {
    const {min, max, step} = state;

    const length = (max - min) / step + 1

    const values = Array(length)
      .fill(null)
      .map((_, index) => min + step * index)
      .map(String)

    return values;
  }

  init(store: Store<IRangeSliderStore>) {
    this.elements.scale = new TrackScale();
    this.elements.track = new Track(this.elements.scale);

    this.root = this.elements.track;

    window.addEventListener('resize', () => {
      this.elements.scale.update(this.getSliderValues(store.getState()));
    });

    this.elements.scale.element.addEventListener('click', (event: any) => {
      if (event.target.nodeName === 'LI') {
        store.dispatch({
          type: actions.CHANGE_RIGHT_VALUE,
          value: parseInt(event.target.textContent),
        });
      }
    });
  }

  render(state: IRangeSliderStore) {
    this.elements.scale.update(this.getSliderValues(state));
  }
}
