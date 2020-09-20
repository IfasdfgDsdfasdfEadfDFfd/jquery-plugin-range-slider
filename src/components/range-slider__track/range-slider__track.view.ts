import { IRangeSliderStore } from '../reducer';
import { Provider, View } from '../../core';


export class Track extends View {
  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__track'}});
  }
}


export class RangeSliderTrack extends Provider<IRangeSliderStore, {track: Track}> {
  init() {
    this.elements.track = new Track();
    this.root = this.elements.track;
  }

  render() {}
}
