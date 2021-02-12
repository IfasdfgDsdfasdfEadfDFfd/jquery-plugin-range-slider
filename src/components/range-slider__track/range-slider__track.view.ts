import { ContainerView, View } from '@core';
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

class Progress extends ContainerView<ProgressProps> {
  attrs = {
    class: 'range-slider__progress',
  };

  childViewClass = ProgressSegment;

  getProps({ segments: iterator, ...restProps }: ProgressProps): ContainerViewProps {
    return {
      iterator,
      restProps,
    };
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

@memo({ methods: ['updateColor', 'updatePosition'] })
class Thumb extends View<ThumbProps> {
  attrs = {
    class: 'range-slider__thumb',
  };
  children = {
    marker: new ThumbMarker(),
  };

  render({ positionOffset, markerText, color }: ThumbProps): void {
    this.updatePosition(positionOffset);
    this.updateColor(color);
    this.children.marker.render({ text: markerText, color });
  }

  getSelfWidth(): number {
    return this.nativeElement.offsetWidth / (this.nativeElement.parentElement?.offsetWidth || 1);
  }

  updatePosition(offset: number): void {
    const selfOffset = this.getSelfWidth() * offset;
    this.nativeElement.style.setProperty('left', `${offset - selfOffset}%`);
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('border-color', newColor);
  }
}

@memo({ methods: ['updateText', 'updateColor'] })
class ThumbMarker extends View<ThumbMarkerProps> {
  attrs = {
    class: 'range-slider__thumb__marker',
  };

  render({ text, color }: ThumbMarkerProps): void {
    this.updateText(text);
    this.updateColor(color);
  }

  updateText(newText: string): void {
    this.nativeElement.textContent = newText;
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('color', newColor);
  }
}

export { Track, Progress, ProgressSegment, Thumb, ThumbMarker };
