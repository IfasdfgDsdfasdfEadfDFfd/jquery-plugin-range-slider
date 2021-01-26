import { createStore, NaNValidator, Store } from '@core';
import {
  actionNames,
  IRangeSliderStoreState,
  rangeSliderStoreReducer,
} from '@store';
import {
  RangeSliderInput,
  RangeSliderLeftInput,
} from './range-slider__input-range.view';

describe('RangeSliderInput provider', () => {
  let store: Store<IRangeSliderStoreState>;
  let rangeSliderInput: RangeSliderInput;

  beforeEach(() => {
    store = createStore<IRangeSliderStoreState>(
      {
        min: 0,
        max: 10,
        step: 1,
        value: [3, 5],
        prefix: () => '',
        postfix: () => '',
        vertical: false,
        intervalMode: false,
        markerVisibility: false,
        trackScaleVisibility: false,
        primaryColor: 'rgb(255, 255, 255)',
        fixedValues: [],
      },
      rangeSliderStoreReducer,
      [NaNValidator],
    );
    rangeSliderInput = new RangeSliderInput(store);
    store.coldStart();
  });

  test('min value changing', () => {
    const defaultMin = store.getState().min;
    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('min'),
    ).toEqual(defaultMin.toString());

    const nextMin = 10;
    store.dispatch({
      name: actionNames.CHANGE_MIN,
      value: nextMin,
    });

    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('min'),
    ).toEqual(nextMin.toString());
  });

  test('max value changing', () => {
    const defaultMax = store.getState().max;
    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('max'),
    ).toEqual(defaultMax.toString());

    const nextMax = 100;
    store.dispatch({
      name: actionNames.CHANGE_MAX,
      value: nextMax,
    });

    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('max'),
    ).toEqual(nextMax.toString());
  });

  test('step value changing', () => {
    const defaultStep = store.getState().step;
    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('step'),
    ).toEqual(defaultStep.toString());

    const nextStep = 5;
    store.dispatch({
      name: actionNames.CHANGE_STEP,
      value: nextStep,
    });

    expect(
      rangeSliderInput.elements.input.nativeElement.getAttribute('step'),
    ).toEqual(nextStep.toString());
  });

  test('intervalMode value changing', () => {
    expect(
      rangeSliderInput.elements.input.nativeElement.classList.contains(
        'range-slider__input--interval',
      ),
    ).toBeFalsy();

    store.dispatch({
      name: actionNames.CHANGE_INTERVAL_MODE,
      value: true,
    });

    expect(
      rangeSliderInput.elements.input.nativeElement.classList.contains(
        'range-slider__input--interval',
      ),
    ).toBeTruthy();
  });

  test('primaryColor value changing', () => {
    const defaultColor = store.getState().primaryColor;
    expect(
      rangeSliderInput.elements.thumb.nativeElement.style.getPropertyValue(
        'background-color',
      ),
    ).toEqual(defaultColor);
    expect(
      rangeSliderInput.elements.thumb.marker.nativeElement.style.getPropertyValue(
        'background-color',
      ),
    ).toEqual(defaultColor);

    const nextColor = 'rgb(255, 0, 0)';
    store.dispatch({
      name: actionNames.CHANGE_PRIMARY_COLOR,
      value: nextColor,
    });

    expect(
      rangeSliderInput.elements.thumb.nativeElement.style.getPropertyValue(
        'background-color',
      ),
    ).toEqual(nextColor);
    expect(
      rangeSliderInput.elements.thumb.marker.nativeElement.style.getPropertyValue(
        'background-color',
      ),
    ).toEqual(nextColor);
  });

  test('markerVisibility value changing', () => {
    expect(rangeSliderInput.elements.thumb.marker.isVisible).toBeFalsy();
    store.dispatch({
      name: actionNames.CHANGE_MARKER_VISIBILITY,
      value: true,
    });
    expect(rangeSliderInput.elements.thumb.marker.isVisible).toBeTruthy();
  });
});

describe('RangeSliderLeftInput provider', () => {
  let store: Store<IRangeSliderStoreState>;
  let rangeSliderLeftInput: RangeSliderLeftInput;

  beforeEach(() => {
    store = createStore<IRangeSliderStoreState>(
      {
        min: 0,
        max: 10,
        step: 1,
        value: [3, 10],
        prefix: () => '',
        postfix: () => '',
        vertical: false,
        intervalMode: false,
        markerVisibility: false,
        trackScaleVisibility: false,
        primaryColor: 'rgb(255, 255, 255)',
        fixedValues: [],
      },
      rangeSliderStoreReducer,
      [NaNValidator],
    );
    rangeSliderLeftInput = new RangeSliderLeftInput(store);
    store.coldStart();
  });

  test('thumb visibility changing', () => {
    expect(rangeSliderLeftInput.elements.thumb.isVisible).toBeFalsy();

    store.dispatch({
      name: actionNames.CHANGE_INTERVAL_MODE,
      value: true,
    });

    expect(rangeSliderLeftInput.elements.thumb.isVisible).toBeTruthy();
  });

  test('input value changing', () => {
    const initValue = store.getState().value[0];
    expect(rangeSliderLeftInput.elements.input.value).toEqual(initValue);

    const nextValue = initValue + 5;
    store.dispatch({
      name: actionNames.CHANGE_LEFT_VALUE,
      value: nextValue,
    });

    expect(rangeSliderLeftInput.elements.input.value).toEqual(nextValue);
  });
});
