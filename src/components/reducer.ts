import { Action, Reducer } from '../core';


interface IRangeSliderStore {
  min: number,
  max: number,
  value: [number, number],
  step: number,
  vertical: boolean,
  intervalMode: boolean
  markerVisibility: boolean,
  trackScaleVisibility: boolean,
}

const actions = {
  CHANGE_LEFT_VALUE: '@CHANGE_LEFT_VALUE',
  CHANGE_RIGHT_VALUE: '@CHANGE_RIGHT_VALUE',
  CHANGE_MIN: '@CHANGE_MIN',
  CHANGE_MAX: '@CHANGE_MAX',
  CHANGE_STEP: '@CHANGE_STEP',
  CHANGE_ORIENT: '@CHANGE_ORIENT',
  CHANGE_INTERVAL_MODE: '@CHANGE_INTERVAL_MODE',
  CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
  CHANGE_TRACK_SCALE_VISIBILITY: '@CHANGE_TRACK_SCALE_VISIBILITY',
};


const rangeSliderStoreReducer: Reducer<IRangeSliderStore> = (
  action: Action,
  state: IRangeSliderStore
): IRangeSliderStore => {

  let left: number;
  let right: number;
  let min, max, step: number;
  let value: [number, number];

  switch (action.type) {

    case actions.CHANGE_LEFT_VALUE:
      left = Math.max(state.min, Math.min(action.value, state.value[1]));
      right = Math.min(state.max, Math.max(action.value, state.value[1]));

      return {...state, value: [
        left - left % state.step,
        right - right % state.step,
      ]};

    case actions.CHANGE_RIGHT_VALUE:
      left = Math.max(state.min, Math.min(state.value[0], action.value));
      right = Math.min(state.max, Math.max(state.value[0], action.value));

      return {...state, value: [
        left - left % state.step,
        right - right % state.step,
      ]};

    case actions.CHANGE_MIN:
      min = Math.min(parseInt(action.value), state.max);
      return {...state, min: min - (min % state.step),
        value: [Math.max(min, state.value[0]), state.value[1]]};

    case actions.CHANGE_MAX:
      max = Math.max(parseInt(action.value), state.min);
      right = Math.min(max, state.value[1]);
      return {...state, max: max - (max % state.step), value: [state.value[0], right]};

    case actions.CHANGE_STEP:
      step = Math.min(Math.max(parseInt(action.value), 1));
      value = [
        Math.round(state.value[0] - state.value[0] % step),
        Math.round(state.value[1] - state.value[1] % step),
      ];

      return {...state, step, value, min: state.min - (state.min % step), max: state.max - (state.max % step)};

    case actions.CHANGE_ORIENT:
      return {...state, vertical: action.value};

    case actions.CHANGE_INTERVAL_MODE:
      return {...state, intervalMode: action.value,
        value: (action.value) ? state.value : [state.min, state.value[1]]
      };

    case actions.CHANGE_MARKER_VISIBILITY:
      return {...state, markerVisibility: action.value};

    case actions.CHANGE_TRACK_SCALE_VISIBILITY:
      return {...state, trackScaleVisibility: action.value};

    default:
      return state;
  }
};


export {
  IRangeSliderStore,
  rangeSliderStoreReducer,
  actions,
}
