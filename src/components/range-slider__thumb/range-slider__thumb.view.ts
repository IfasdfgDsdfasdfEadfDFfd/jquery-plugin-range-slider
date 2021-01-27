import { View } from '@core';

import styles from '../../exports.scss';

class Thumb extends View {
  hidingClassName = 'range-slider__thumb--hidden';
  focusClassName = 'range-slider__thumb--focused';
  hoverClassName = 'range-slider__thumb--hovered';

  marker!: ThumbMarker;
  color = '';

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb' },
      children: [new ThumbMarker()],
    });
    this.marker = this.children[0] as ThumbMarker;
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
    const selfPercent = (this.selfWidth / this.parentWidth || 1) * 100 * ratio;

    return offsetPercent - selfPercent;
  }

  setPrimaryColor(value: string) {
    this.nativeElement.style.setProperty('background-color', value);
    this.color = value;

    this.marker.setPrimaryColor(value);
  }

  chooseColors(): void {
    if (this.isFocused || this.isHovered) {
      this.invertColors();
      this.marker.invertColors();
    } else {
      this.resetColors();
      this.marker.resetColors();
    }
  }

  invertColors() {
    this.nativeElement.style.removeProperty('background-color');
    this.nativeElement.style.setProperty('border-color', this.color);
  }

  resetColors() {
    this.nativeElement.style.removeProperty('border-color');
    this.nativeElement.style.setProperty('background-color', this.color);
  }

  handleFocusChange(): void {
    this.chooseColors();
  }

  handleHoverChange(): void {
    this.chooseColors();
  }
}

class ThumbMarker extends View {
  hidingClassName = 'range-slider__thumb__marker--hidden';
  minVerticalMargin = 25;
  isVertical = false;
  color = '';
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

  setPrimaryColor(value: string) {
    this.nativeElement.style.setProperty('background-color', value);
    this.color = value;
  }

  invertColors() {
    this.nativeElement.style.removeProperty('background-color');
    this.nativeElement.style.setProperty('color', this.color);
    this.nativeElement.style.setProperty('border-color', this.color);
  }

  resetColors() {
    this.nativeElement.style.removeProperty('border-color');
    this.nativeElement.style.removeProperty('color');
    this.nativeElement.style.setProperty('background-color', this.color);
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
