import { View } from '@core';

class Thumb extends View {
  hidingClassName = 'range-slider__thumb_hidden';
  focusClassName = 'range-slider__thumb_focused';
  hoverClassName = 'range-slider__thumb_hovered';

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
    const selfPercent =
      (this.nativeElement.clientWidth / this.parentWidth || 1) * 100 * ratio;

    return offsetPercent - selfPercent;
  }

  setPrimaryColor(value: string) {
    this.color = value;
    this.chooseColors();
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

class ThumbMarker extends View<Thumb> {
  hidingClassName = 'range-slider__thumb__marker_hidden';
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

    const offset = -((this.selfWidth - this.parentWidth) / 2);
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

  invertColors() {
    this.nativeElement.style.removeProperty('background-color');
    this.nativeElement.style.setProperty('color', this.parent.color);
    this.nativeElement.style.setProperty('border-color', this.parent.color);
  }

  resetColors() {
    this.nativeElement.style.removeProperty('border-color');
    this.nativeElement.style.removeProperty('color');
    this.nativeElement.style.setProperty('background-color', this.parent.color);
  }

  setVerticalMargin() {
    this.nativeElement.style.setProperty(
      'margin-top',
      `${-this.selfWidth / 2 - this.minVerticalMargin}px`,
    );
  }

  resetMargin() {
    this.nativeElement.style.removeProperty('margin-top');
  }
}

export { Thumb, ThumbMarker };
