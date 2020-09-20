import { IRangeSliderStore } from '../reducer';
import { Provider, View } from '../../core';


export class Track extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__track'}});
  }
}


interface TElements {
  track: Track;
};

export class RangeSliderTrack extends Provider<IRangeSliderStore, TElements> {
  init() {
    this.elements.track = new Track();
    this.root = this.elements.track;
  }

  render() {}
}
