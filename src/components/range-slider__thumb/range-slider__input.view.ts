import { View } from '@core';
import { memo } from 'core/utils';

@memo(['updateColor'])
class Thumb extends View<ThumbProps> {
  attrs = {
    class: 'range-slider__thumb',
  };
  children = {
    marker: new ThumbMarker(),
  };

  render({ markerText, color }: ThumbProps): void {
    this.updateColor(color);

    this.children.marker.render({ text: markerText, color });
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('border-color', newColor);
  }
}

@memo(['updateText', 'updateColor'])
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
