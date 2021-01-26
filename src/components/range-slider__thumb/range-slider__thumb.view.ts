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

  get parentWidth(): number {
    return <number>this.nativeElement.parentElement?.clientWidth;
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
    console.log('new offset', offset);
    this.nativeElement.style.setProperty('left', `${offset}%`);
  }

  calcOffset({ value, max, min }: { [key: string]: number }): number {
    const ratio = (value - min) / (max - min);
    const offsetPercent = 100 * ratio;
    const selfPercent = (this.selfWidth / this.parentWidth) * 100 * ratio;

    console.log('parentWidth', this.parentWidth);

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
  width = 0;
  cachedValue = '';

  constructor() {
    super({
      tag: 'div',
      attrs: { class: 'range-slider__thumb__marker' },
      children: [],
    });
  }

  set vertical(isVertical: boolean) {
    if (isVertical) {
      this.setVerticalMargin();
    } else {
      this.resetMargin();
    }
  }

  set text(value: string) {
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
    this.text = this.cachedValue;
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
