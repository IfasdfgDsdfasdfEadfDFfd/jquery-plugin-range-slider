import { HiddenView, getOffset } from '../../core/shortcuts';

import styles from '../../exports.scss';

class Thumb extends HiddenView {
  hidingElementClassName = 'range-slider__thumb--hidden';

  marker!: ThumbMarker;
  lastValues!: {
    max: number;
    min: number;
    value: number;
    prefix: string;
  };

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb' },
      children: [new ThumbMarker()],
    });
    this.marker = this.children[0] as ThumbMarker;
  }

  positioning(max: number, min: number, value: number, prefix: string): void {
    this.lastValues = { max, min, value, prefix };

    const thumbWidth =
      <number>this.element.clientWidth + parseInt(styles.thumbWidth);
    const sliderWidth = <number>this.element.parentElement?.clientWidth;

    const offset = getOffset(thumbWidth, sliderWidth, value, max, min);

    this.element.style.setProperty('left', `${offset}%`);

    this.marker.value = `${prefix}${value}`;
  }

  set focused(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--focused', value);
  }

  set hovered(value: boolean) {
    this.element.classList.toggle('range-slider__thumb--hovered', value);
  }

  positionCorrection(): void {
    const { max, min, value, prefix } = this.lastValues;
    this.positioning(max, min, value, prefix);
  }
}

class ThumbMarker extends HiddenView {
  hidingElementClassName = 'range-slider__thumb__marker--hidden';
  _value!: string;

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb__marker' },
      children: [],
    });
  }

  set value(value: string) {
    this.replaceChildren([value]);

    const width = Math.max(
      value.length * parseInt(styles.rootFontSize),
      parseInt(styles.minThumbMarkerWidth) * parseInt(styles.rootFontSize),
    );
    this.element.style.setProperty('width', `${width}px`);

    const offset = -(
      (width - <number>this.element.parentElement?.clientWidth) /
      2
    );
    this.element.style.setProperty('margin-left', `${offset}px`);

    this._value = value;
  }

  positionCorrection() {
    this.value = this._value;
  }
}

export { Thumb };
