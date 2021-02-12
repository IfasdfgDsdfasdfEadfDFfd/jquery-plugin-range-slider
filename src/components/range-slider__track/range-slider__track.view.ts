import { View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new Progress(),
  };

  render({ color, progressSegments: segments }: TrackProps): void {
    this.children.progress.render({ color, segments });
  }
}

class Progress extends View<ProgressProps> {
  attrs = {
    class: 'range-slider__progress',
  };

  render({ color, segments }: ProgressProps): void {
    segments.forEach((segment, index) => {
      const { leftOffset, rightOffset } = segment;
      const props = { leftOffset, rightOffset, color };

      if (!this.children[index]) {
        this.children[index] = new ProgressSegment();
        this.children[index].init(this.nativeElement);
      }

      this.children[index].render(props);
    });
  }
}

@memo({ methods: ['updateColor', 'updateLeftOffset', 'updateRightOffset'] })
class ProgressSegment extends View<ProgressSegmentProps> {
  attrs = {
    class: 'range-slider__progress__segment',
  };

  render({ color, leftOffset, rightOffset }: ProgressSegmentProps): void {
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

export { Track, Progress, ProgressSegment };
