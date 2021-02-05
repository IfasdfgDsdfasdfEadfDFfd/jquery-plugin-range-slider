import { View } from '@core';
import { memo } from 'core/utils';

@memo(['updateMin', 'updateMax', 'updateValue'])
class Input extends View<InputProps> {
  tag = 'input';
  attrs = {
    type: 'range',
    class: 'range-slider__input',
  };

  render({ data, valueChangeHandler }: InputProps): void {
    this.updateMin(data.min);
    this.updateMin(data.max);
    this.updateMin(data.value);

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

class Thumb extends View<ThumbProps> {}

export { Input, Thumb };
