import { IRangeSliderStore } from '../reducer';
import { View, EventCallback, Provider, Store } from '../../core';
import { actions } from '../reducer';


export class InputRange extends View {
  constructor() {
    super({tag: 'input', attrs: {type: 'range', class: 'range-slider__input'}});
  }

  set value(nextValue: number) {
    this.element.setAttribute('value', nextValue.toString());
    (this.element as HTMLInputElement).value = nextValue.toString();
  }

  get value(): number {
    return parseInt(<string>this.element.getAttribute('value'));
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

  set intervalMode(apply: boolean) {
    const className = 'range-slider__input--interval';
    this.element.classList.toggle(className, apply);
  }

  onChange(cb: EventCallback) {
    this.element.addEventListener('input', cb);
  }
}



export abstract class RangeSliderInputRange extends Provider<IRangeSliderStore, {
  input: InputRange,
}> {
  init(_store?: Store<IRangeSliderStore>) {
    this.elements.input = new InputRange();
    this.root = this.elements.input;
  }

  render(state: IRangeSliderStore) {
    this.elements.input.min = state.min;
    this.elements.input.max = state.max;
    this.elements.input.step = state.step;
    this.elements.input.intervalMode = state.intervalMode;
  }
}

export class LeftRangeSliderInputRange extends RangeSliderInputRange {
  init(store: Store<IRangeSliderStore>) {
    super.init();

    this.elements.input.onChange(event => {
      store.dispatch({
        type: actions.CHANGE_LEFT_VALUE,
        value: parseInt(event.target.value),
      })
    })
  }

  render(state: IRangeSliderStore) {
    super.render(state);

    if (state.intervalMode) {
      this.elements.input.value = state.value[0];
    } else {
      this.elements.input.value = state.min;
    }
  }
}

export class RightRangeSliderInputRange extends RangeSliderInputRange {
  init(store: Store<IRangeSliderStore>) {
    super.init();

    this.elements.input.onChange(event => {
      store.dispatch({
        type: actions.CHANGE_RIGHT_VALUE,
        value: parseInt(event.target.value),
      })
    })
  }

  render(state: IRangeSliderStore) {
    super.render(state);
    this.elements.input.value = state.value[1];
  }
}
