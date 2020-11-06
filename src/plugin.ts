import { createRangeSlider } from './components';
import {
  actionNames,
  defaultState,
  IRangeSliderState,
} from './components/reducer';

interface PluginApi {
  subscribe(cb: (state: IRangeSliderState) => void): void;
  setLeftValue(value: number): void;
  setRightValue(value: number): void;
  setPrefix(value: string): void;
  setPostfix(value: string): void;
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
  prefix: string;
  postfix: string;
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

  if (props.values && props.values?.length !== 0) {
    if (props.from && props.to) {
      leftValue = props.values?.indexOf(props.from) || 0;
      rightValue = props.values?.indexOf(props.to) || props.values.length - 1;
    }
  } else {
    if (typeof props.from === 'number' && typeof props.to === 'number') {
      leftValue = props.from;
      rightValue = props.to;
    }
  }

  const userDefinedProps: IRangeSliderState = {
    value: [leftValue, rightValue],
    min: props.min === undefined ? defaultState.min : props.min,
    max: props.max === undefined ? defaultState.max : props.max,
    step: props.step === undefined ? defaultState.step : props.step,
    prefix: props.prefix === undefined ? defaultState.prefix : props.prefix,
    postfix: props.postfix === undefined ? defaultState.postfix : props.postfix,
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

    setLeftValue(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_LEFT_VALUE, value });
    },

    setRightValue(value) {
      componentStore.dispatch({ name: actionNames.CHANGE_RIGHT_VALUE, value });
    },

    setPrefix(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_PREFIX,
        value: value || '',
      });
    },

    setPostfix(value) {
      componentStore.dispatch({
        name: actionNames.CHANGE_POSTFIX,
        value: value || '',
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
