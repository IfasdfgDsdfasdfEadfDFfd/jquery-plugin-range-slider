import * as core from '../core';
import { InputRange } from './input-range';
import { SliderTrack } from './slider-track';
import { SliderProgress } from './slider-progress';
import { SliderThumb } from './slider-thumb';
import { IViewProps } from '../core';

interface IRangeSliderStore {
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  vertical?: boolean,
}

export class RangeSlider extends core.Provider<IRangeSliderStore> {
  static actions = {
    CHANGE_VALUE: '@CHANGE_VALUE',
    CHANGE_MIN: '@CHANGE_MIN',
    CHANGE_MAX: '@CHANGE_MAX',
    CHANGE_STEP: '@CHANGE_STEP',
    CHANGE_ORIENT: '@CHANGE_ORIENT',
    CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
  }

  constructor(root: HTMLElement, initValue?: IRangeSliderStore, attrs?: IViewProps['attrs']) {
    super(root, initValue, {class: 'range-slider', ...attrs});
  }

  initStore(initValue: IRangeSliderStore = {}): core.Store {
    const INIT = Object.assign({
      min: 0,
      max: 100,
      value: 50,
      step: 5,
      vertical: false,
      markerVisibility: false,
    }, initValue);

    return core.createStore(INIT,
      (action, state): IRangeSliderStore => {
        let value = state.value;
        switch (action.type) {

          case RangeSlider.actions.CHANGE_VALUE:
            return {...state, value: Math.max(state.min, Math.min(parseInt(action.value), state.max))}

          case RangeSlider.actions.CHANGE_MIN:
            const min = Math.min(parseInt(action.value), state.max);
            value = Math.max(value, min);
            return {...state, min, value};

          case RangeSlider.actions.CHANGE_MAX:
            const max = Math.max(parseInt(action.value), state.min);
            value = Math.min(value, max);
            return {...state, max, value};

          case RangeSlider.actions.CHANGE_STEP:
            return {...state, step: Math.min(Math.max(parseInt(action.value), 1), state.max)};

          case RangeSlider.actions.CHANGE_ORIENT:
            return {...state, vertical: action.value};

          case RangeSlider.actions.CHANGE_MARKER_VISIBILITY:
            return {...state, markerVisibility: action.value};

          default:
            return state;
        }
      }
    )
  }

  initViews(store: core.Store): core.View[] {
    const storeState = store.getState();

    const inputRange = new InputRange({
      min: storeState.min,
      max: storeState.max,
      value: storeState.value,
      step: storeState.step,
    });

    inputRange.onChange((event) => {
      store.dispatch({
        type: RangeSlider.actions.CHANGE_VALUE,
        value: event?.target.value,
      });
    });

    const sliderTrack = new SliderTrack();
    const sliderProgress = new SliderProgress();
    const sliderThumb = new SliderThumb();

    store.subscribe(state => {
      inputRange.value = state.value;
      inputRange.min = state.min;
      inputRange.max = state.max;
      inputRange.step = state.step;

      sliderProgress.value = {...state};

      sliderThumb.position = {...state};
      sliderThumb.markerVisibility = state.markerVisibility;
      sliderThumb.markerValue = state.value;
    });

    return [inputRange, sliderTrack, sliderProgress, sliderThumb];
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
