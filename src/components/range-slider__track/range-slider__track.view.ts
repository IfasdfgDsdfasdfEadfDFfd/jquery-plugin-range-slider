import { View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    item: new TrackProgress(),
  };

  render({ progressProps }: TrackProps): void {
    this.children.item.render(progressProps);
  }
}

@memo(['updateColor', 'updateLeftOffset', 'updateRightOffset'])
class TrackProgress extends View<TrackProgressProps> {
  attrs = {
    class: 'range-slider__track__progress',
  };

  render({ color, leftOffset, rightOffset }: TrackProgressProps): void {
    this.updateLeftOffset(leftOffset);
    this.updateRightOffset(rightOffset);
    this.updateColor(color);
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('background-color', newColor);
  }

  updateLeftOffset(value: number): void {
    this.nativeElement.style.setProperty('left', `${value}%`);
  }

  updateRightOffset(value: number): void {
    this.nativeElement.style.setProperty('right', `${value}%`);
  }
}

export { Track, TrackProgress };
