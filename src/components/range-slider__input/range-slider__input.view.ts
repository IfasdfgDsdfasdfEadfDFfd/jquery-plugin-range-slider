import { View } from '@core';
import { memo } from 'core/utils';

class Input extends View<InputProps> {
  attrs = {
    class: 'range-slider__input',
  };
  children = {
    item: new InputItem(),
  };

  render({ itemProps }: InputProps): void {
    this.children.item.render(itemProps);
  }
}

class InputItem extends View<InputItemProps> {
  attrs = {
    class: 'range-slider__input__item',
  };
  children = {
    element: new InputItemElement(),
    thumb: new InputItemThumb(),
  };

  render({ elementProps, thumbProps }: InputItemProps): void {
    this.children.element.render(elementProps);
    this.children.thumb.render(thumbProps);
  }
}

@memo(['updateMin', 'updateMax', 'updateValue'])
class InputItemElement extends View<InputItemElementProps> {
  tag = 'input';
  attrs = {
    type: 'range',
    class: 'range-slider__input__item__element',
  };

  render({ min, max, value, valueChangeHandler }: InputItemElementProps): void {
    this.updateMin(min);
    this.updateMax(max);
    this.updateValue(value);

    this.onValueChange(valueChangeHandler);
  }

  updateMin(value: number): void {
    this.nativeElement.setAttribute('min', value.toString());
  }

  updateMax(value: number): void {
    this.nativeElement.setAttribute('max', value.toString());
  }

  updateValue(value: number): void {
    this.nativeElement.setAttribute('value', value.toString());
  }

  // should be memo
  onValueChange(listener: EventListener): void {
    this.nativeElement.addEventListener('input', listener);
  }
}

@memo(['updateColor'])
class InputItemThumb extends View<InputItemThumbProps> {
  attrs = {
    class: 'range-slider__input__item__thumb',
  };
  children = {
    marker: new InputItemThumbMarker(),
  };

  render({ markerText, color }: InputItemThumbProps): void {
    this.updateColor(color);

    this.children.marker.render({ text: markerText, color });
  }

  updateColor(newColor: string): void {
    this.nativeElement.style.setProperty('border-color', newColor);
  }
}

@memo(['updateText', 'updateColor'])
class InputItemThumbMarker extends View<InputItemThumbMarkerProps> {
  attrs = {
    class: 'range-slider__input__item__thumb__marker',
  };

  render({ text, color }: InputItemThumbMarkerProps): void {
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

export { Input, InputItem, InputItemElement, InputItemThumb, InputItemThumbMarker };
