import { View, ContainerView } from '@core';
import { memo } from 'core/utils';

class Input extends ContainerView<InputProps> {
  attrs = {
    class: 'range-slider__input',
  };

  childViewClass = InputElement;

  render(props: InputProps): void {
    super.render(props);

    this.nativeElement.classList.toggle(`${this.attrs.class}_interval`, props.values.length > 1);
  }

  getProps({ values, ...restProps }: InputProps): ContainerViewProps {
    return { iterator: values.map((value, index) => ({ value, index })), restProps };
  }
}

@memo({ methods: ['updateMin', 'updateMax', 'updateStep', 'updateValue', 'updateInputHandler'] })
class InputElement extends View<InputElementProps> {
  tag = 'input';
  attrs = {
    type: 'range',
    class: 'range-slider__input__element',
  };

  render({ min, max, step, value, index, valueChangeHandler }: InputElementProps): void {
    this.updateMin(min);
    this.updateMax(max);
    this.updateStep(step);
    this.updateValue(value);
    this.updateInputHandler(value => valueChangeHandler(index, value));
  }

  updateMin(value: number): void {
    this.nativeElement.setAttribute('min', value.toString());
  }

  updateMax(value: number): void {
    this.nativeElement.setAttribute('max', value.toString());
  }

  updateStep(value: number): void {
    this.nativeElement.setAttribute('step', value.toString());
  }

  updateValue(value: number): void {
    this.nativeElement.setAttribute('value', value.toString());
    (this.nativeElement as HTMLInputElement).value = value.toString();
  }

  updateInputHandler(handler: (value: number) => void): void {
    this.nativeElement.oninput = event => {
      const { value } = event.target as HTMLInputElement;
      handler(parseFloat(value));
    };
  }
}

export { Input, InputElement };
