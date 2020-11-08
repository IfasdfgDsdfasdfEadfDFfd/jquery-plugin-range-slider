import { actionNames, getMax, getMin } from './actions';
import { Action, Reducer } from '../../core';
import { getValue } from './actions/change-value';

import styles from '../../exports.scss';

type cb<T> = (value: T) => string;

interface IRangeSliderState {
  min: number;
  max: number;
  value: [number, number];
  step: number;
  prefix: cb<number>;
  postfix: cb<number>;
  vertical: boolean;
  intervalMode: boolean;
  markerVisibility: boolean;
  trackScaleVisibility: boolean;
  primaryColor: string;
  fixedValues: string[];
}

const defaultState: IRangeSliderState = {
  min: 0,
  max: 100,
  value: [25, 75],
  step: 5,
  prefix: () => '',
  postfix: () => '',
  vertical: false,
  intervalMode: true,
  markerVisibility: true,
  trackScaleVisibility: true,
  primaryColor: styles.primaryColor,
  fixedValues: [],
};

const rangeSliderStoreReducer: Reducer<IRangeSliderState> = (
  action: Action,
  state: IRangeSliderState,
): IRangeSliderState => {
  let min, max, step: number;

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
      step = action.value;
      min = getMin(state.min, state.max, step);
      max = getMax(state.max, state.min, step);

      return {
        ...state,
        step: action.value,
        value: getValue(state.value[0], state.value[1], min, max, step),
        min,
        max,
      };

    case actionNames.CHANGE_PREFIX:
      return { ...state, prefix: action.value };

    case actionNames.CHANGE_POSTFIX:
      return { ...state, postfix: action.value };

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

    case actionNames.CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: action.value };

    case actionNames.CHANGE_FIXED_VALUES:
      min = 0;
      max = action.value.length - 1;

      return {
        ...state,
        fixedValues: action.value,
        min,
        max,
        step: 1,
        value: [min, max],
      };

    default:
      return state;
  }
};

export {
  cb,
  IRangeSliderState,
  rangeSliderStoreReducer,
  actionNames,
  defaultState,
};
