import { ContainerView, View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new Progress(),
    thumb: new Thumb(),
  };

  render({ color, progressSegments: segments, thumbItems: thumbs }: TrackProps): void {
    this.children.progress.render({ color, segments });
    this.children.thumb.render({ color, thumbs });
  }
}

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

class Thumb extends ContainerView<ThumbProps> {
  attrs = {
    class: 'range-slider__thumb',
  };

  childViewClass = ThumbItem;

  getProps({ thumbs: iterator, ...restProps }: ThumbProps): ContainerViewProps {
    return { iterator, restProps };
  }
}

@memo({ methods: ['updateColor', 'updatePosition'] })
class ThumbItem extends View<ThumbItemProps> {
  attrs = {
    class: 'range-slider__thumb__item',
  };
  children = {
    marker: new ThumbItemMarker(),
  };

  render({ positionOffset, markerText, color }: ThumbItemProps): void {
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
    this.nativeElement.style.setProperty('background-color', newColor);
  }
}

@memo({ methods: ['updateText', 'updateColor'] })
class ThumbItemMarker extends View<ThumbItemMarkerProps> {
  attrs = {
    class: 'range-slider__thumb__item__marker',
  };

  render({ text, color }: ThumbItemMarkerProps): void {
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

export { Track, Progress, ProgressSegment, Thumb, ThumbItem, ThumbItemMarker };
