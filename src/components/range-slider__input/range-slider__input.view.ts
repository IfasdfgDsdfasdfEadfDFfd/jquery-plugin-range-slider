import { View } from '@core';
import { memo } from 'core/utils';

class Input extends View<InputProps> {
  attrs = {
    class: 'range-slider__input',
  };

  render({ min, max, values, valueChangeHandler }: InputProps): void {
    values.forEach((value, index) => {
      const childProps = { min, max, value, valueChangeHandler };

      if (!this.children[index]) {
        this.children[index] = new InputElement();
        this.children[index].init(this.nativeElement);
      }

      this.children[index].render(childProps);
    });
  }
}

@memo(['updateMin', 'updateMax', 'updateValue'])
class InputElement extends View<InputElementProps> {
  tag = 'input';
  attrs = {
    type: 'range',
    class: 'range-slider__input__element',
  };

  render({ min, max, value }: InputElementProps): void {
    this.updateMin(min);
    this.updateMax(max);
    this.updateValue(value);
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
}

export { Input, InputElement };
