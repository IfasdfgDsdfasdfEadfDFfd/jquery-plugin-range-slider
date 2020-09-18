import * as core from '../core';
import { InputRange } from './input-range';
import { SliderTrack } from './slider-track';
import { SliderProgress } from './slider-progress';
import { SliderThumb } from './slider-thumb';
import { IViewProps, loadFromLocalStoragePlugin, saveToLocalStoragePlugin } from '../core';
import { rangeSliderStoreReducer, actions } from './reducer';

export interface IRangeSliderStore {
  min: number,
  max: number,
  value: [number, number],
  step: number,
  vertical: boolean,
  markerVisibility: boolean,
  intervalMode: boolean
}

export class RangeSlider extends core.Provider<IRangeSliderStore> {

  constructor(root: HTMLElement, initValue?: IRangeSliderStore, attrs?: IViewProps['attrs']) {
    super(root, initValue, {class: 'range-slider', ...attrs});
  }

  initStore(initValue = {}): core.Store {
    const INIT = Object.assign({
      min: 0,
      max: 100,
      value: [25, 75],
      step: 5,
      vertical: false,
      markerVisibility: false,
      intervalMode: false,
    }, initValue) as IRangeSliderStore;

    const STORE_KEY = 'range-slider'

    return core.createStore<IRangeSliderStore>(
      INIT,
      rangeSliderStoreReducer,
      {
        pre: [loadFromLocalStoragePlugin<IRangeSliderStore>(STORE_KEY)],
        post: [saveToLocalStoragePlugin<IRangeSliderStore>(STORE_KEY)],
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
        type: actions.CHANGE_VALUE,
        value: [
          parseInt(event?.target.value),
          parseInt(<string>rightInputRange.element.getAttribute('value')),
        ],
      });
    });

    rightInputRange.onChange(event => {
      store.dispatch({
        type: actions.CHANGE_VALUE,
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
      leftSliderThumb.markerVisibility = state.markerVisibility && state.intervalMode;
      leftSliderThumb.markerValue = state.value[0];
      leftSliderThumb.hidden = !state.intervalMode;

      rightSliderThumb.position = {min: state.min, max: state.max, value: state.value[1]};
      rightSliderThumb.markerVisibility = state.markerVisibility;
      rightSliderThumb.markerValue = state.value[1];

      if (state.intervalMode === false) {
        leftInputRange.value = state.min;
        sliderProgress.value = {...state, value: [0, state.value[1]]};
        leftSliderThumb.position = {min: state.min, max: state.max, value: state.min};
      }

    });

    return [
      leftInputRange,
      rightInputRange,
      sliderTrack,
      sliderProgress,
      leftSliderThumb,
      rightSliderThumb
    ];
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
