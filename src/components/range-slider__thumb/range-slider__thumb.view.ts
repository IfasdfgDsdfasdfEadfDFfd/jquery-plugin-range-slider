import { View } from '@core';
import { memo } from 'core/utils';

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

export { Thumb, ThumbMarker };
