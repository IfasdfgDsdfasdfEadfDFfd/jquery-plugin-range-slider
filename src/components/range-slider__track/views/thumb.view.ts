import { View, ContainerView } from '@core';
import { memo } from 'core/utils';

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

  render({ positionOffset, markerText: text, color }: ThumbItemProps): void {
    this.updatePosition(positionOffset);
    this.updateColor(color);
    this.children.marker.render({ text, color });
  }

  updatePosition(offset: number): void {
    this.nativeElement.style.setProperty('left', `${offset}%`);
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
    this.positionCorrection();
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('background-color', newColor);
  }

  positionCorrection(): void {
    const parentWidth = this.nativeElement.parentElement?.clientWidth || 0;
    const correctionOffset = Math.abs(this.nativeElement.offsetWidth - parentWidth) / 2;

    this.nativeElement.style.setProperty('margin-left', `-${correctionOffset}px`);
  }
}

export { Thumb, ThumbItem, ThumbItemMarker };
