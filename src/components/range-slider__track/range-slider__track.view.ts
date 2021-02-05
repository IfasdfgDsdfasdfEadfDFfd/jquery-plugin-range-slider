import { View } from '@core';
import { memo } from 'core/utils';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new TrackProgress(),
    scale: new TrackScale(),
  };
}

@memo(['updateLeftOffset', 'updateRightOffset'])
class TrackProgress extends View<TrackProgressProps> {
  attrs = {
    class: 'range-slider__track-progress',
  };

  render({ leftOffset, rightOffset }: TrackProgressProps): void {
    this.updateLeftOffset(leftOffset);
    this.updateRightOffset(rightOffset);
  }

  updateLeftOffset(value: number): void {
    this.nativeElement.style.setProperty('left', `${value}%`);
  }

  updateRightOffset(value: number): void {
    this.nativeElement.style.setProperty('right', `${100 - value}%`);
  }
}

@memo(['updateScaleItems'])
class TrackScale extends View<TrackScaleProps> {
  tag = 'ul';
  attrs = {
    class: 'range-slider__track-scale',
  };

  render({ values }: TrackScaleProps): void {
    this.updateScaleItems(values);
  }

  updateScaleItems(values: string[]): void {
    this.nativeElement.innerHTML = '';

    this.children = values.reduce((newChildren, value, index) => {
      const item = new TrackScaleItem();

      item.init(this.nativeElement);
      item.render({ buttonText: value });

      return { ...newChildren, [index]: item };
    }, {} as ViewChildren);
  }
}

class TrackScaleItem extends View<TrackScaleItemProps> {
  tag = 'li';
  attrs = {
    class: 'range-slider__track-scale__item',
  };
  children = {
    button: new TrackScaleItemButton(),
  };

  render({ buttonText }: TrackScaleItemProps): void {
    this.children.button.render({ text: buttonText });
  }
}

@memo(['updateText'])
class TrackScaleItemButton extends View<TrackScaleItemButtonProps> {
  tag = 'button';
  attrs = {
    type: 'button',
    class: 'range-slider__track-scale__item-button',
  };

  render({ text }: TrackScaleItemButtonProps): void {
    this.updateText(text);
  }

  updateText(newText: string): void {
    this.nativeElement.textContent = newText;
  }
}

export { Track, TrackProgress, TrackScale, TrackScaleItem, TrackScaleItemButton };
