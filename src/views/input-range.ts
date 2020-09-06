import { View, EventCallback, IViewProps } from '../core';


export class InputRange extends View {
  constructor(attrs: IViewProps['attrs']) {
    super({tag: 'input', attrs: {type: 'range', ...attrs, class: 'range-slider__input'}});
  }

  set value(nextValue: number) {
    this.element.setAttribute('value', nextValue.toString());
  }

  set min(nextMin: number) {
    this.element.setAttribute('min', nextMin.toString());
  }

  set max(nextMax: number) {
    this.element.setAttribute('max', nextMax.toString());
  }

  set step(nextStep: number) {
    this.element.setAttribute('step', nextStep.toString());
  }

  onChange(cb: EventCallback) {
    this.element.addEventListener('input', cb);
  }
}
