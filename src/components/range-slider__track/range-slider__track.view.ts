import { IRangeSliderStore } from '../reducer';
import { Provider, View } from '../../core';


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
    this.replaceChildren(values.map(value => new TrackScaleItem(value)));
  }
}

export class TrackScaleItem extends View {
  constructor(value: string = '') {
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

    const values = Array((max - min) / step + 1)
      .fill(null)
      .map((_, index) => min + step * index)
      .map(value => String(value));

    return values;
  }

  init() {
    this.elements.scale = new TrackScale();
    this.elements.track = new Track(this.elements.scale);

    this.root = this.elements.track;
  }

  render(state: IRangeSliderStore) {
    this.elements.scale.update(this.getSliderValues(state));
  }
}
