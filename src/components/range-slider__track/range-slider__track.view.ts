import { View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };

  render({ bars, color }: TrackProps): void {
    bars.forEach((value, index) => {
      const props = { ...value, color };

      if (!this.children[index]) {
        this.children[index] = new TrackProgress();
        this.children[index].init(this.nativeElement);
      }

      this.children[index].render(props);
    });
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

  updateLeftOffset(value: string): void {
    this.nativeElement.style.setProperty('left', value);
  }

  updateRightOffset(value: string): void {
    this.nativeElement.style.setProperty('right', value);
  }
}

export { Track, TrackProgress };
