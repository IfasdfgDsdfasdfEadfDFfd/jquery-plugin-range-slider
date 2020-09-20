import { Action } from '../core';


export interface IRangeSliderStore {
  min: number,
  max: number,
  value: [number, number],
  step: number,
  vertical: boolean,
  markerVisibility: boolean,
  intervalMode: boolean
}

export const actions = {
  CHANGE_LEFT_VALUE: '@CHANGE_LEFT_VALUE',
  CHANGE_RIGHT_VALUE: '@CHANGE_RIGHT_VALUE',
  CHANGE_MIN: '@CHANGE_MIN',
  CHANGE_MAX: '@CHANGE_MAX',
  CHANGE_STEP: '@CHANGE_STEP',
  CHANGE_ORIENT: '@CHANGE_ORIENT',
  CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
  CHANGE_INTERVAL_MODE: '@CHANGE_INTERVAL_MODE',
};


export const rangeSliderStoreReducer = (
  action: Action,
  state: IRangeSliderStore
): IRangeSliderStore => {

  let left: number;
  let right: number;

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
      const min = Math.min(parseInt(action.value), state.max, state.value[0]);
      return {...state, min: min - (min % state.step)};

    case actions.CHANGE_MAX:
      const max = Math.max(parseInt(action.value), state.min, state.value[1]);
      return {...state, max: max - (max % state.step)};

    case actions.CHANGE_STEP:
      const step = Math.min(Math.max(parseInt(action.value), 1));
      const value = [
        Math.round(state.value[0] - state.value[0] % step),
        Math.round(state.value[1] - state.value[1] % step),
      ] as [number, number]

      return {...state, step, value, min: state.min - (state.min % step), max: state.max - (state.max % step)};

    case actions.CHANGE_ORIENT:
      return {...state, vertical: action.value};

    case actions.CHANGE_MARKER_VISIBILITY:
      return {...state, markerVisibility: action.value};

    case actions.CHANGE_INTERVAL_MODE:
      return {...state, intervalMode: action.value,
        value: (action.value) ? state.value : [state.min, state.value[1]]
      };

    default:
      return state;
  }
};
