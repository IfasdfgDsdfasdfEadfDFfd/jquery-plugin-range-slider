import { HiddenView, getOffset } from "../../core/shortcuts";

import styles from '../../exports.scss';


class Thumb extends HiddenView {
  hidingElementClassName = 'range-slider__thumb--hidden'

  marker!: ThumbMarker;
  lastValues!: {
    max: number,
    min: number,
    value: number
  };

  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__thumb'}, children: [new ThumbMarker()]});
    this.marker = this.children[0] as ThumbMarker;
  }

  positionate({max, min, value}: {[key: string]: number}): void {
    this.lastValues = {max, min, value};

    const thumbWidth = <number>this.element.clientWidth + parseInt(styles.thumbWidth);
    const sliderWidth = <number>this.element.parentElement?.clientWidth;

    const offset = getOffset(thumbWidth, sliderWidth, value, max, min);

    this.element.style.setProperty('left',
      `${offset}%`);

    this.marker.value = value;
  }

  set focused(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--focused', value);
    this.positionCorrection();
    this.marker.positionCorrection();
  }

  set hovered(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--hovered', value);
    this.positionCorrection();
    this.marker.positionCorrection();
  }

  positionCorrection(): void {
    this.positionate(this.lastValues);
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

    const width = Math.max(
      value.toString().length * parseInt(styles.rootFontSize),
      parseInt(styles.minThumbMarkerWidth) * parseInt(styles.rootFontSize)
    );
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
