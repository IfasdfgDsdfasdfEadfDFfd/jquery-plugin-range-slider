import { View } from '../core';


export class SliderThumb extends View {
  constructor() {
    super({ tag: 'div', attrs: { class: 'range-slider__thumb' }, children: [
      new View({tag: 'div', attrs: {class: 'range-slider__thumb__marker'}})
    ]});
  }

  set position({min, max, value}: {min: number, max: number, value: number}) {
    const percent = (value - min) / (max - min) * 100;
    this.element.style.left = `${percent - (.03 * percent)}%`;
  };

  set markerValue(value: number) {
    const marker = this.element.querySelector('.range-slider__thumb__marker');


    if (marker?.firstChild) {
      marker.replaceChild(document.createTextNode(value.toString()), marker.firstChild as Node);
    } else {
      marker?.appendChild(document.createTextNode(value.toString()));
    }

    (marker as HTMLElement)?.style.setProperty('width', `${value.toString().length + .5}rem`);
    (marker as HTMLElement)?.style.setProperty('left', `${-.5 * (value.toString().length - .5)}rem`);
  }

  set markerVisibility(isVisible: boolean) {
    const marker = this.element.querySelector('.range-slider__thumb__marker')
    if (isVisible) {
        marker?.classList.add('range-slider__thumb__marker--visible');
    } else {
        marker?.classList.remove('range-slider__thumb__marker--visible');
    }
  }

  set hidden(value: boolean) {
    const className = 'range-slider__thumb--hidden';

    if (value) {
      this.element.classList.add(className);
    } else {
      this.element.classList.remove(className);
    }
  }
}
