import * as core from '../core';
import { InputRange } from './input-range';
import { SliderTrack } from './slider-track';
import { SliderProgress } from './slider-progress';
import { SliderThumb } from './slider-thumb';
import { IViewProps } from '../core';

interface IRangeSliderStore {
  min?: number,
  max?: number,
  value?: [number, number],
  step?: number,
  vertical?: boolean,
  markerVisibility?: boolean,
  intervalMode?: boolean
}

export class RangeSlider extends core.Provider<IRangeSliderStore> {
  static actions = {
    CHANGE_VALUE: '@CHANGE_VALUE',
    CHANGE_MIN: '@CHANGE_MIN',
    CHANGE_MAX: '@CHANGE_MAX',
    CHANGE_STEP: '@CHANGE_STEP',
    CHANGE_ORIENT: '@CHANGE_ORIENT',
    CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
    CHANGE_INTERVAL_MODE: '@CHANGE_INTERVAL_MODE',
  }

  constructor(root: HTMLElement, initValue?: IRangeSliderStore, attrs?: IViewProps['attrs']) {
    super(root, initValue, {class: 'range-slider', ...attrs});
  }

  initStore(initValue: IRangeSliderStore = {}): core.Store {
    const INIT = Object.assign({
      min: 0,
      max: 100,
      value: [25, 75],
      step: 5,
      vertical: false,
      markerVisibility: false,
      intervalMode: false,
    }, initValue);

    return core.createStore(INIT,
      (action, state): IRangeSliderStore => {
        switch (action.type) {

          case RangeSlider.actions.CHANGE_VALUE:
            const [left, right] = action.value;

            const value = [
              Math.max(state.min, Math.min(left, right)),
              Math.min(state.max, Math.max(left, right)),
            ];

            return {...state, value};

          case RangeSlider.actions.CHANGE_MIN:
            const min = Math.min(parseInt(action.value), state.max);
            return {...state, min};

          case RangeSlider.actions.CHANGE_MAX:
            const max = Math.max(parseInt(action.value), state.min);
            return {...state, max};

          case RangeSlider.actions.CHANGE_STEP:
            return {...state, step: Math.min(Math.max(parseInt(action.value), 1), state.max)};

          case RangeSlider.actions.CHANGE_ORIENT:
            return {...state, vertical: action.value};

          case RangeSlider.actions.CHANGE_MARKER_VISIBILITY:
            return {...state, markerVisibility: action.value};

          case RangeSlider.actions.CHANGE_INTERVAL_MODE:
            return {...state, intervalMode: action.value};

          default:
            return state;
        }
      }
    )
  }

  initViews(store: core.Store): core.View[] {
    const storeState = store.getState();

    const leftInputRange = new InputRange({
      min: storeState.min,
      max: storeState.max,
      value: storeState.value[0],
      step: storeState.step,
    });

    const rightInputRange = new InputRange({
      min: storeState.min,
      max: storeState.max,
      value: storeState.value[1],
      step: storeState.step,
    });

    leftInputRange.onChange(event => {
      store.dispatch({
        type: RangeSlider.actions.CHANGE_VALUE,
        value: [
          parseInt(event?.target.value),
          parseInt(<string>rightInputRange.element.getAttribute('value')),
        ],
      });
    });

    rightInputRange.onChange(event => {
      store.dispatch({
        type: RangeSlider.actions.CHANGE_VALUE,
        value: [
          parseInt(<string>leftInputRange.element.getAttribute('value')),
          parseInt(event?.target.value),
        ],
      });
    });

    const sliderTrack = new SliderTrack();
    const sliderProgress = new SliderProgress();
    const leftSliderThumb = new SliderThumb();
    const rightSliderThumb = new SliderThumb();

    store.subscribe(state => {
      leftInputRange.value = state.value[0];
      leftInputRange.min = state.min;
      leftInputRange.max = state.max;
      leftInputRange.step = state.step;
      leftInputRange.intervalMode = state.intervalMode;

      rightInputRange.value = state.value[1];
      rightInputRange.min = state.min;
      rightInputRange.max = state.max;
      rightInputRange.step = state.step;
      rightInputRange.intervalMode = state.intervalMode;

      sliderProgress.value = {...state};

      leftSliderThumb.position = {min: state.min, max: state.max, value: state.value[0]};
      leftSliderThumb.markerVisibility = state.markerVisibility;
      leftSliderThumb.markerValue = state.value;

      rightSliderThumb.position = {min: state.min, max: state.max, value: state.value[1]};
      rightSliderThumb.markerVisibility = state.markerVisibility;
      rightSliderThumb.markerValue = state.value;
    });

    return [leftInputRange, rightInputRange, sliderTrack, sliderProgress, leftSliderThumb, rightSliderThumb];
  }

  initSelf() {
    this.store.subscribe(state => {
      if (state.vertical) {
        this.container.element.classList.add('range-slider--vertical');
      } else {
        this.container.element.classList.remove('range-slider--vertical');
      }
    });
  }
}
