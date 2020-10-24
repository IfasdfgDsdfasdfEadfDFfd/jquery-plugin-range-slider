import { HiddenView } from "../../core/shortcuts";

import styles from '../../exports.scss';


class Thumb extends HiddenView {
  hidingElementClassName = 'range-slider__thumb--hidden'
  marker!: ThumbMarker;

  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__thumb'}, children: [new ThumbMarker()]});
    this.marker = this.children[0] as ThumbMarker;
  }

  set position({
    max, min, value, orientation,
  }: {
    max: number, min: number, value: number, orientation: string,
  }) {
    const thumbWidth = <number>parseInt(styles.thumbWidth) * parseInt(styles.rootFontSize)
      + (<number>parseInt(styles.thumbBorderWidth) * 2);
    const sliderWidth = <number>this.element.parentElement?.clientWidth;

    const ratio = (value - min) / (max - min);

    const thumbPercent = (thumbWidth / sliderWidth) * 100;
    const rightOffset = thumbPercent / 4 * (1- ratio);
    const leftOffset = thumbPercent / 4 * (ratio);
    const percent = (ratio * 100);

    if (orientation === 'right') {
      this.element.style.setProperty('right', `${100 - percent - (thumbPercent * (1 - ratio)) - rightOffset}%`);
    } else {
      this.element.style.setProperty(orientation, `${percent - (thumbPercent * ratio) - leftOffset}%`);
    }

    this.marker.value = value;
  }

  set focused(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--focused', value);
    this.marker.positionCorrection();
  }

  set hovered(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--hovered', value);
    this.marker.positionCorrection();
  }
}

class ThumbMarker extends HiddenView {
  hidingElementClassName = 'range-slider__thumb__marker--hidden'
  _value!: number;

  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__thumb__marker'}, children: []});
  }

  set value(value: number) {
    this.replaceChildren([value.toString()]);

    const width = value.toString().length * parseInt(styles.rootFontSize);
    this.element.style.setProperty('width', `${width}px`);

    const offset = -((width - <number>this.element.parentElement?.clientWidth) / 2);
    this.element.style.setProperty('margin-left', `${offset}px`)

    this._value = value;
  }

  positionCorrection() {
    this.value = this._value;
  }
}


export {
  Thumb,
};
