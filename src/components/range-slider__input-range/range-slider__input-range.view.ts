import { IRangeSliderState, actionNames } from '../reducer';
import { Thumb } from '../range-slider__thumb';
import { View, Action, EventCallback, Provider, Store } from '../../core';

class InputRange extends View {
  constructor() {
    super({
      tag: 'input',
      attrs: { name: 'range', class: 'range-slider__input' },
      children: [],
    });
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

  onChange(cb: EventCallback): void {
    this.element.addEventListener('input', cb);
  }

  onFocusIn(cb: EventCallback): void {
    this.element.addEventListener('focusin', cb);
  }

  onFocusOut(cb: EventCallback): void {
    this.element.addEventListener('focusout', cb);
  }

  onMouseIn(cb: EventCallback): void {
    this.element.addEventListener('mouseenter', cb);
  }

  onMouseOut(cb: EventCallback): void {
    this.element.addEventListener('mouseleave', cb);
  }
}

abstract class RangeSliderInputRange extends Provider<
  IRangeSliderState,
  {
    input: InputRange;
    thumb: Thumb;
  }
> {
  init(store: Store<IRangeSliderState>): void {
    this.elements.input = new InputRange();
    this.elements.thumb = new Thumb();

    this.elements.input.onChange(event => {
      const target = event.target as HTMLInputElement;
      store.dispatch(this.makeAction(parseInt(target.value)));
    });

    this.elements.input.onFocusIn(() => (this.elements.thumb.focused = true));
    this.elements.input.onFocusOut(() => (this.elements.thumb.focused = false));
    this.elements.input.onMouseIn(() => (this.elements.thumb.hovered = true));
    this.elements.input.onMouseOut(() => (this.elements.thumb.hovered = false));
  }

  render(state: IRangeSliderState): void {
    this.elements.input.min = state.min;
    this.elements.input.max = state.max;
    this.elements.input.step = state.step;
    this.elements.input.intervalMode = state.intervalMode;

    this.elements.thumb.marker.hidden = !state.markerVisibility;
  }

  abstract makeAction(value: number): Action;
}

class LeftRangeSliderInputRange extends RangeSliderInputRange {
  render(state: IRangeSliderState): void {
    super.render(state);

    if (!state.intervalMode) {
      this.elements.input.value = state.min;
    }

    this.elements.thumb.hidden = !state.intervalMode;

    this.elements.input.value = state.value[0];

    const { max, min, value } = state;
    this.elements.thumb.positionate({ max, min, value: value[0] });
  }

  makeAction(value: number): Action {
    return {
      name: actionNames.CHANGE_LEFT_VALUE,
      value,
    };
  }
}

class RightRangeSliderInputRange extends RangeSliderInputRange {
  render(state: IRangeSliderState): void {
    super.render(state);
    this.elements.input.value = state.value[1];

    const { max, min, value } = state;
    this.elements.thumb.positionate({ max, min, value: value[1] });
  }

  makeAction(value: number): Action {
    return {
      name: actionNames.CHANGE_RIGHT_VALUE,
      value,
    };
  }
}

export { InputRange, LeftRangeSliderInputRange, RightRangeSliderInputRange };
