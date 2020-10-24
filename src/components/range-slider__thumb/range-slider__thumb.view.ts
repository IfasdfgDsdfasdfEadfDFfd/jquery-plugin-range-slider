import { HiddenView } from "../../core/shortcuts";

import styles from '../../exports.scss';


class Thumb extends HiddenView {
  hidingElementClassName = 'range-slider__thumb--hidden'

  constructor() {
    super({tag: 'div', attrs: {class: 'range-slider__thumb'}, children: []});
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
  }

  set focused(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--focused', value);
  }

  set hovered(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--hovered', value);
  }
}


export {
  Thumb,
};
