import { Provider } from '../../core';
import { HiddenView } from '../../core/shortcuts';
import { IRangeSliderStore } from '../reducer';


export class RangeSliderThumb extends HiddenView {
  readonly hidingElementClassName = 'range-slider__thumb--hidden';

  constructor(marker: RangeSliderThumbMarker) {
    super({ tag: 'div', attrs: { class: 'range-slider__thumb' }, children: [marker]});
  }

  set position({min, max, value}: {min: number, max: number, value: number}) {
    const percent = (value - min) / (max - min);
    const infelicity = 4 * percent;
    this.element.style.setProperty('left', `${percent * 100 - infelicity}%`);
  };
}

export class RangeSliderThumbMarker extends HiddenView {
  readonly hidingElementClassName = 'range-slider__thumb__marker--hidden';

  constructor() {
    super({ tag: 'div', attrs: { class: 'range-slider__thumb__marker' }, children: ['']});
  }

  set value(value: number) {
    this.element.replaceChild(document.createTextNode(value.toString()), this.element.firstChild as Node);

    this.element.style.setProperty('width', `${value.toString().length + .5}rem`);
    this.element.style.setProperty('left', `${-.5 * (value.toString().length - .5)}rem`);
  }
}

interface IElements {
  thumb: RangeSliderThumb;
  marker: RangeSliderThumbMarker;
}

export abstract class RangeSliderThumbProvider extends Provider<IRangeSliderStore, IElements> {
  init() {
    this.elements.marker = new RangeSliderThumbMarker();
    this.elements.thumb = new RangeSliderThumb(this.elements.marker);
    this.root = this.elements.thumb;
  }

  abstract render(state: IRangeSliderStore): void;
}

export class LeftRangeSliderThumb extends RangeSliderThumbProvider {
  render(state: IRangeSliderStore) {
    this.elements.thumb.position = {min: state.min, max: state.max, value: state.value[0]};
    this.elements.thumb.hidden = !state.intervalMode;

    this.elements.marker.hidden = !state.markerVisibility && state.intervalMode;
    this.elements.marker.value = state.value[0];
  }
}

export class RightRangeSliderThumb extends RangeSliderThumbProvider {
  render(state: IRangeSliderStore) {
    this.elements.thumb.position = {min: state.min, max: state.max, value: state.value[1]};

    this.elements.marker.hidden = !state.markerVisibility;
    this.elements.marker.value = state.value[1];
  }
}
