import { createRangeSlider } from './components';
import {
  actionNames,
  defaultState,
  IRangeSliderState,
} from './components/reducer';
import { makeValueLikeCallback, cb } from './core/utils';

interface PluginApi {
  subscribe(cb: (state: IRangeSliderState) => void): void;
  setFixedValues(value: string[]): void;
  setLeftValue(value: number): void;
  setRightValue(value: number): void;
  setPrefix(value: string | cb): void;
  setPostfix(value: string | cb): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setOrientVertical(value: boolean): void;
  setIntervalMode(value: boolean): void;
  setMarkerVisibility(value: boolean): void;
  setTrackScaleVisibility(value: boolean): void;
  setPrimaryColor(value: string): void;
}

interface PluginProps {
  from: string | number;
  to: string | number;
  min: number;
  max: number;
  step: number;
  values: Array<string | number>;
  prefix: string | cb;
  postfix: string | cb;
  vertical: boolean;
  intervalMode: boolean;
  markerVisibility: boolean;
  trackScaleVisibility: boolean;
  color: string;
}

function rangeSlider(
  this: JQuery,
  props: Partial<PluginProps> = {},
): PluginApi {
  let leftValue = defaultState.value[0];
  let rightValue = defaultState.value[1];
  let fixedValues = defaultState.fixedValues;

  if (props.values && props.values?.length !== 0) {
    fixedValues = props.values.map(String);
    props.max = fixedValues.length - 1;
    props.min = 0;
    props.step = 1;

    if (props.from && props.to) {
      const leftValueIndex = props.values.indexOf(props.from);
      const rightValueIndex = props.values.indexOf(props.to);
      leftValue = leftValueIndex === -1 ? props.min : leftValueIndex;
      rightValue = rightValueIndex === -1 ? props.max : rightValueIndex;
    }
  } else {
    if (typeof props.from === 'number' && typeof props.to === 'number') {
      leftValue = props.from;
      rightValue = props.to;
    }
  }

  let prefix = defaultState.prefix;
  if (props.prefix) {
    prefix = makeValueLikeCallback(props.prefix);
  }

  let postfix = defaultState.postfix;
  if (props.postfix) {
    postfix = makeValueLikeCallback(props.postfix);
  }

  const userDefinedProps: IRangeSliderState = {
    fixedValues,
    value: [leftValue, rightValue],
    min: props.min === undefined ? defaultState.min : props.min,
    max: props.max === undefined ? defaultState.max : props.max,
    step: props.step === undefined ? defaultState.step : props.step,
    prefix,
    postfix,
    vertical:
      props.vertical === undefined ? defaultState.vertical : props.vertical,
    intervalMode:
      props.intervalMode === undefined
        ? defaultState.intervalMode
        : props.intervalMode,
    markerVisibility:
      props.markerVisibility === undefined
        ? defaultState.markerVisibility
        : props.markerVisibility,
    trackScaleVisibility:
      props.trackScaleVisibility === undefined
        ? defaultState.trackScaleVisibility
        : props.trackScaleVisibility,
    primaryColor:
      props.color === undefined ? defaultState.primaryColor : props.color,
  };

  const componentStore = createRangeSlider(this.get(0), userDefinedProps);

  return {
    subscribe(cb: (state: IRangeSliderState) => void) {
      componentStore.subscribe(cb);
    },

    setFixedValues(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_FIXED_VALUES,
        value,
      });
    },

    setLeftValue(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_LEFT_VALUE, value });
    },

    setRightValue(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_RIGHT_VALUE, value });
    },

    setPrefix(value) {
      value = makeValueLikeCallback(value);
      componentStore.dispatch({
        name: actionNames.CHANGE_PREFIX,
        value,
      });
    },

    setPostfix(value) {
      value = makeValueLikeCallback(value);
      componentStore.dispatch({
        name: actionNames.CHANGE_POSTFIX,
        value,
      });
    },

    setMin(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_MIN, value });
    },

    setMax(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_MAX, value });
    },

    setStep(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_STEP, value });
    },

    setOrientVertical(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_ORIENT, value });
    },

    setIntervalMode(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_INTERVAL_MODE,
        value,
      });
    },

    setMarkerVisibility(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_MARKER_VISIBILITY,
        value,
      });
    },

    setTrackScaleVisibility(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_TRACK_SCALE_VISIBILITY,
        value,
      });
    },

    setPrimaryColor(value) {
      if (value.startsWith('#')) {
        const substringValue = value.substr(1);
        if (substringValue.length === 3 || substringValue.length === 6) {
          componentStore.dispatch({
            name: actionNames.CHANGE_PRIMARY_COLOR,
            value,
          });
        }
      }
    },
  };
}

export { rangeSlider };
