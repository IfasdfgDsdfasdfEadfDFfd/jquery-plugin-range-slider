import { View } from '@core';

import styles from '../../exports.scss';

class Thumb extends View {
  hidingClassName = 'range-slider__thumb--hidden';
  focusClassName = 'range-slider__thumb--focused';
  hoverClassName = 'range-slider__thumb--hovered';

  marker!: ThumbMarker;
  lastColor!: string;

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb' },
      children: [new ThumbMarker()],
    });
    this.marker = this.children[0] as ThumbMarker;
  }

  get selfWidth(): number {
    return <number>this.nativeElement.clientWidth + parseInt(styles.thumbWidth);
  }

  setPrimaryColor(value: string) {
    this.nativeElement.style.setProperty('background-color', value);
    this.marker.nativeElement.style.setProperty('background-color', value);
    this.lastColor = value;
  }

  setOffset({ min, max, value }: { min: number; max: number; value: number }) {
    const offset = this.calcOffset({
      min,
      max,
      value,
    });
    this.nativeElement.style.setProperty('left', `${offset}%`);
  }

  calcOffset({ value, max, min }: { [key: string]: number }): number {
    const ratio = (value - min) / (max - min);
    const offsetPercent = 100 * ratio;
    const selfPercent = (this.selfWidth / this.parentWidth) * 100 * ratio;

    return offsetPercent - selfPercent;
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

  handleFocusChange(): void {
    this.colorReset();
  }

  handleHoverChange(): void {
    this.colorReset();
  }
}

class ThumbMarker extends View {
  hidingClassName = 'range-slider__thumb__marker--hidden';
  minVerticalMargin = 25;
  isVertical = false;
  width = 0;

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb__marker' },
      children: [],
    });
  }

  set text(value: string) {
    this.replaceChildren([value]);

    const multiplier = parseInt(styles.rootFontSize);
    const calculatedValue =
      value.split(' ').join('').split('.').join('').length * multiplier;
    const minPossibleWidth = parseInt(styles.minThumbMarkerWidth) * multiplier;

    this.width = Math.max(calculatedValue, minPossibleWidth);
    this.nativeElement.style.setProperty('width', `${this.width}px`);

    const offset = -((this.width - this.parentWidth) / 2);
    this.nativeElement.style.setProperty('margin-left', `${offset}px`);

    this.positionCorrection();
  }

  set vertical(isVertical: boolean) {
    this.isVertical = isVertical;
    this.positionCorrection();
  }

  positionCorrection() {
    if (this.isVertical) {
      this.setVerticalMargin();
    } else {
      this.resetMargin();
    }
  }

  setVerticalMargin() {
    this.nativeElement.style.setProperty(
      'margin-top',
      `${-this.width / 2 - this.minVerticalMargin}px`,
    );
  }

  resetMargin() {
    this.nativeElement.style.removeProperty('margin-top');
  }
}

export { Thumb, ThumbMarker };
