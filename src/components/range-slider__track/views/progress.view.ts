import { View, ContainerView } from '@core';
import { memo } from 'core/utils';

class Progress extends ContainerView<ProgressProps> {
  attrs = {
    class: 'range-slider__progress',
  };

  childViewClass = ProgressSegment;

  getProps({ segments: iterator, ...restProps }: ProgressProps): ContainerViewProps {
    return { iterator, restProps };
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

export { Progress, ProgressSegment };
