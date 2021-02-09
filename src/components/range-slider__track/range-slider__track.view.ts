import { View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };

  render({ offsetPairs, color }: TrackProps): void {
    offsetPairs.forEach((pair, index) => {
      const props = { leftOffset: pair.left, rightOffset: pair.right, color };

      if (!this.children[index]) {
        this.children[index] = new TrackProgress();
        this.children[index].init(this.nativeElement);
      }

      this.children[index].render(props);
    });
  }
}

@memo({ methods: ['updateColor', 'updateLeftOffset', 'updateRightOffset'] })
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
    this.nativeElement.style.setProperty('right', `${100 - value}%`);
  }
}

export { Track, TrackProgress };
