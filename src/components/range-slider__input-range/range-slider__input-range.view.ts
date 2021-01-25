import { View, EventCallback, Provider, Store } from '@core';
import { IRangeSliderStoreState, actionNames } from '@store';
import { Thumb } from 'components/range-slider__thumb';
import { useMemo } from 'core/utils';

class InputRange extends View {
  constructor() {
    super({
      tag: 'input',
      attrs: { type: 'range', name: 'range', class: 'range-slider__input' },
      children: [],
    });
  }

  set value(nextValue: number) {
    this.nativeElement.setAttribute('value', nextValue.toString());
    (this.nativeElement as HTMLInputElement).value = nextValue.toString();
  }

  get value(): number {
    return parseInt(<string>this.nativeElement.getAttribute('value'));
  }

  set min(nextMin: number) {
    this.nativeElement.setAttribute('min', nextMin.toString());
  }

  set max(nextMax: number) {
    this.nativeElement.setAttribute('max', nextMax.toString());
  }

  set step(nextStep: number) {
    this.nativeElement.setAttribute('step', nextStep.toString());
  }

  set intervalMode(apply: boolean) {
    const className = 'range-slider__input--interval';
    this.nativeElement.classList.toggle(className, apply);
  }

  handleInputRangeChange(cb: EventCallback): void {
    this.nativeElement.addEventListener('input', cb);
  }
}

class RangeSliderInput extends Provider<
  IRangeSliderStoreState,
  {
    input: InputRange;
    thumb: Thumb;
  }
> {
  storeActionName = '';

  init(store: Store<IRangeSliderStoreState>): void {
    this.elements.input = new InputRange();
    this.elements.thumb = new Thumb();

    this.elements.input.handleInputRangeChange(event => {
      const target = event.target as HTMLInputElement;

      store.dispatch({
        name: this.storeActionName,
        value: Number(target.value),
      });
    });

    this.elements.input.handleViewFocusIn(
      () => (this.elements.thumb.focused = true),
    );
    this.elements.input.handleViewFocusOut(
      () => (this.elements.thumb.focused = false),
    );
    this.elements.input.handleViewMouseIn(
      () => (this.elements.thumb.hovered = true),
    );
    this.elements.input.handleViewMouseOut(
      () => (this.elements.thumb.hovered = false),
    );

    store.subscribe(
      useMemo(
        ({ min }) => min,
        min => (this.elements.input.min = min),
      ),
    );

    store.subscribe(
      useMemo(
        ({ max }) => max,
        max => (this.elements.input.max = max),
      ),
    );

    store.subscribe(
      useMemo(
        ({ step }) => step,
        step => (this.elements.input.step = step),
      ),
    );

    store.subscribe(
      useMemo(
        ({ intervalMode }) => intervalMode,
        value => (this.elements.input.intervalMode = value),
      ),
    );

    store.subscribe(
      useMemo(
        ({ markerVisibility }) => markerVisibility,
        value => (this.elements.thumb.marker.visible = value),
      ),
    );

    store.subscribe(
      useMemo(
        ({ primaryColor }) => primaryColor,
        color => this.elements.thumb.setPrimaryColor(color),
      ),
    );
  }

  render(_: IRangeSliderStoreState): void {}
}

class RangeSliderLeftInput extends RangeSliderInput {
  storeActionName: string = actionNames.CHANGE_LEFT_VALUE;

  init(store: Store<IRangeSliderStoreState>): void {
    super.init(store);

    store.subscribe(
      useMemo(
        ({ intervalMode }) => intervalMode,
        value => (this.elements.thumb.visible = value),
      ),
    );

    store.subscribe(
      useMemo(
        ({ value }) => value[0],
        value => (this.elements.input.value = value),
      ),
    );
  }

  render(state: IRangeSliderStoreState): void {
    super.render(state);

    const { max, min, value, prefix, postfix, fixedValues, vertical } = state;

    const displayValue =
      fixedValues.length > 0 ? fixedValues[value[0]] : value[0];

    this.elements.thumb.positioning({
      max,
      min,
      value: value[0],
      prefix: prefix(value[0]),
      postfix: postfix(value[0]),
      displayValue,
      vertical,
    });
  }
}

class RangeSliderRightInput extends RangeSliderInput {
  storeActionName: string = actionNames.CHANGE_RIGHT_VALUE;

  render(state: IRangeSliderStoreState): void {
    super.render(state);
    this.elements.input.value = state.value[1];

    const { max, min, value, prefix, postfix, fixedValues, vertical } = state;

    const displayValue =
      fixedValues.length > 1 ? fixedValues[value[1]] : value[1];

    this.elements.thumb.positioning({
      max,
      min,
      value: value[1],
      prefix: prefix(value[1]),
      postfix: postfix(value[1]),
      displayValue,
      vertical,
    });
  }
}

export {
  InputRange,
  RangeSliderInput,
  RangeSliderLeftInput,
  RangeSliderRightInput,
};
