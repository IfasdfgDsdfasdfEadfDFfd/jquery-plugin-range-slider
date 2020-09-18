import { Action } from "../core";
import { IRangeSliderStore } from "./index";


export const actions = {
  CHANGE_VALUE: '@CHANGE_VALUE',
  CHANGE_MIN: '@CHANGE_MIN',
  CHANGE_MAX: '@CHANGE_MAX',
  CHANGE_STEP: '@CHANGE_STEP',
  CHANGE_ORIENT: '@CHANGE_ORIENT',
  CHANGE_MARKER_VISIBILITY: '@CHANGE_MARKER_VISIBILITY',
  CHANGE_INTERVAL_MODE: '@CHANGE_INTERVAL_MODE',
};


export const rangeSliderStoreReducer = (action: Action, state: IRangeSliderStore): IRangeSliderStore => {
  switch (action.type) {

    case actions.CHANGE_VALUE:
      const [left, right] = action.value;

      const value = [
        Math.max(state.min, Math.min(left, right)),
        Math.min(state.max, Math.max(left, right)),
      ] as [number, number];

      return {...state, value};

    case actions.CHANGE_MIN:
      const min = Math.min(parseInt(action.value), state.max);
      return {...state, min};

    case actions.CHANGE_MAX:
      const max = Math.max(parseInt(action.value), state.min);
      return {...state, max};

    case actions.CHANGE_STEP:
      return {...state, step: Math.min(Math.max(parseInt(action.value), 1), state.max)};

    case actions.CHANGE_ORIENT:
      return {...state, vertical: action.value};

    case actions.CHANGE_MARKER_VISIBILITY:
      return {...state, markerVisibility: action.value};

    case actions.CHANGE_INTERVAL_MODE:
      return {...state, intervalMode: action.value, value: (action.value) ? state.value : [0, state.value[1]]};

    default:
      return state;
  }
};