import { View } from '@core';

import styles from '../../exports.scss';

interface IThumbPositionParams {
  min: number;
  max: number;
  value: number;
  prefix: string;
  postfix: string;
  displayValue: string | number;
}

class Thumb extends View {
  hidingClassName = 'range-slider__thumb--hidden';
  focusClassName = 'range-slider__thumb--focused';
  hoverClassName = 'range-slider__thumb--hovered';

  marker!: ThumbMarker;
  cachedValues!: IThumbPositionParams;
  lastColor!: string;
  isFocused = false;

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb' },
      children: [new ThumbMarker()],
    });
    this.marker = this.children[0] as ThumbMarker;
  }

  positioning(params: IThumbPositionParams): void {
    this.cachedValues = params;

    const { min, max, value, prefix, postfix, displayValue } = params;

    const thumbWidth =
      <number>this.element.clientWidth + parseInt(styles.thumbWidth);
    const sliderWidth = <number>this.element.parentElement?.clientWidth;

    const offset = this.getOffset({
      selfWidth: thumbWidth,
      parentWidth: sliderWidth,
      value,
      max,
      min,
    });

    this.element.style.setProperty('left', `${offset}%`);

    this.marker.value = `${prefix}${displayValue}${postfix}`;
  }

  set primaryColor(value: string) {
    if (value !== this.lastColor) {
      this.element.style.setProperty('background-color', value);
      this.marker.element.style.setProperty('background-color', value);
      this.lastColor = value;
    }
  }

  positionCorrection(): void {
    this.positioning(this.cachedValues);
  }

  handleFocusChange(): void {
    this.colorReset();
  }

  handleHoverChange(): void {
    this.colorReset();
  }

  colorReset(): void {
    if (this.isFocused || this.isHovered) {
      this.element.style.removeProperty('background-color');
      this.marker.element.style.removeProperty('background-color');
      this.element.style.setProperty('border-color', this.lastColor);
      this.marker.element.style.setProperty('color', this.lastColor);
      this.marker.element.style.setProperty('border-color', this.lastColor);
    } else {
      this.element.style.removeProperty('border-color');
      this.marker.element.style.removeProperty('border-color');
      this.marker.element.style.removeProperty('color');
      this.element.style.setProperty('background-color', this.lastColor);
      this.marker.element.style.setProperty('background-color', this.lastColor);
    }
  }

  getOffset({
    selfWidth,
    parentWidth,
    value,
    max,
    min,
  }: {
    [key: string]: number;
  }): number {
    const ratio = (value - min) / (max - min);
    const offsetPercent = 100 * ratio;
    const selfPercent = (selfWidth / parentWidth) * 100 * ratio;

    return offsetPercent - selfPercent;
  }
}

class ThumbMarker extends View {
  hidingClassName = 'range-slider__thumb__marker--hidden';
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

  setVerticalMargin() {
    const offset = -this.element.clientWidth;
    this.element.style.setProperty('margin-top', `${offset}px`);
  }
}

export { Thumb };
