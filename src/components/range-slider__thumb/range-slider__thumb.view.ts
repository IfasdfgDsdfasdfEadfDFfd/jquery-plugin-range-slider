import { View } from '@core';

import styles from '../../exports.scss';

interface IThumbPositionParams {
  min: number;
  max: number;
  value: number;
  prefix: string;
  postfix: string;
  displayValue: string | number;
  vertical: boolean;
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

    const { min, max, value, prefix, postfix, displayValue, vertical } = params;

    const thumbWidth =
      <number>this.nativeElement.clientWidth + parseInt(styles.thumbWidth);
    const sliderWidth = <number>this.nativeElement.parentElement?.clientWidth;

    const offset = this.getOffset({
      min,
      max,
      value,
      selfWidth: thumbWidth,
      parentWidth: sliderWidth,
    });

    this.nativeElement.style.setProperty('left', `${offset}%`);

    this.marker.value = `${prefix}${displayValue}${postfix}`;
    if (vertical) {
      this.marker.setVerticalMargin();
    } else {
      this.marker.resetMargin();
    }
  }

  set primaryColor(value: string) {
    if (value !== this.lastColor) {
      this.nativeElement.style.setProperty('background-color', value);
      this.marker.nativeElement.style.setProperty('background-color', value);
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
      this.nativeElement.style.removeProperty('background-color');
      this.marker.nativeElement.style.removeProperty('background-color');
      this.nativeElement.style.setProperty('border-color', this.lastColor);
      this.marker.nativeElement.style.setProperty('color', this.lastColor);
      this.marker.nativeElement.style.setProperty(
        'border-color',
        this.lastColor,
      );
    } else {
      this.nativeElement.style.removeProperty('border-color');
      this.marker.nativeElement.style.removeProperty('border-color');
      this.marker.nativeElement.style.removeProperty('color');
      this.nativeElement.style.setProperty('background-color', this.lastColor);
      this.marker.nativeElement.style.setProperty(
        'background-color',
        this.lastColor,
      );
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
  width = 0;
  cachedValue = '';

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb__marker' },
      children: [],
    });
  }

  set value(value: string) {
    this.replaceChildren([value]);

    const multiplier = parseInt(styles.rootFontSize);

    this.width = Math.max(
      value.split(' ').join('').split('.').join('').length * multiplier,
      parseInt(styles.minThumbMarkerWidth) * multiplier,
    );
    this.nativeElement.style.setProperty('width', `${this.width}px`);

    const offset = -(
      (this.width - <number>this.nativeElement.parentElement?.clientWidth) /
      2
    );
    this.nativeElement.style.setProperty('margin-left', `${offset}px`);

    this.cachedValue = value;
  }

  positionCorrection() {
    this.value = this.cachedValue;
  }

  setVerticalMargin() {
    this.nativeElement.style.setProperty(
      'margin-top',
      `${-this.width / 2 - 25}px`,
    );
  }

  resetMargin() {
    this.nativeElement.style.removeProperty('margin-top');
  }
}

export { Thumb };
