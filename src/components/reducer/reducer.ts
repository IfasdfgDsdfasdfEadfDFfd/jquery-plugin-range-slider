import { actionNames, getMax, getMin } from './actions';
import { Action, Reducer } from '../../core';
import { getValue } from './actions/change-value';
import { makeValue } from './actions/common';

interface IRangeSliderState {
  min: number;
  max: number;
  value: [number, number];
  step: number;
  vertical: boolean;
  intervalMode: boolean;
  markerVisibility: boolean;
  trackScaleVisibility: boolean;
}

const rangeSliderStoreReducer: Reducer<IRangeSliderState> = (
  action: Action,
  state: IRangeSliderState,
): IRangeSliderState => {
  let min, max: number;

  switch (action.name) {
    case actionNames.CHANGE_LEFT_VALUE:
      return {
        ...state,
        value: getValue(
          action.value,
          state.value[1],
          state.min,
          state.max,
          state.step,
        ),
      };

    case actionNames.CHANGE_RIGHT_VALUE:
      return {
        ...state,
        value: getValue(
          state.value[0],
          action.value,
          state.min,
          state.max,
          state.step,
        ),
      };

    case actionNames.CHANGE_MIN:
      min = getMin(action.value, state.max, state.step);

      return {
        ...state,
        min,
        value: [Math.max(min, state.value[0]), state.value[1]],
      };

    case actionNames.CHANGE_MAX:
      max = getMax(action.value, state.min, state.step);

      return {
        ...state,
        max,
        value: [state.value[0], Math.min(state.value[1], max)],
      };

    case actionNames.CHANGE_STEP:
      return {
        ...state,
        step: action.value,
        value: [
          makeValue(state.value[0]).multipleBy(action.value),
          makeValue(state.value[1]).multipleBy(action.value),
        ],
        min: makeValue(state.min).multipleBy(action.value),
        max: makeValue(state.max).multipleBy(action.value),
      };

    case actionNames.CHANGE_ORIENT:
      return { ...state, vertical: action.value };

    case actionNames.CHANGE_INTERVAL_MODE:
      return {
        ...state,
        intervalMode: action.value,
        value: action.value ? state.value : [state.min, state.value[1]],
      };

    case actionNames.CHANGE_MARKER_VISIBILITY:
      return { ...state, markerVisibility: action.value };

    case actionNames.CHANGE_TRACK_SCALE_VISIBILITY:
      return { ...state, trackScaleVisibility: action.value };

    default:
      return state;
  }
};

export { IRangeSliderState, rangeSliderStoreReducer, actionNames };
