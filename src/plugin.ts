import { createRangeSlider } from './components';
import { actionNames, IRangeSliderStoreState } from './store';
import { makeValueLikeCallback, cb } from './core/utils';

interface PluginApi {
  subscribe(cb: (state: PluginProps) => void): void;
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
  min: number;
  max: number;
  step: number;
  from: number;
  to: number;
  values: Array<string | number>;
  prefix: string | cb;
  postfix: string | cb;
  vertical: boolean;
  interval: boolean;
  marker: boolean;
  scale: boolean;
  color: string;
}

function rangeSlider(
  this: JQuery,
  {
    min = 1,
    max = 10,
    step = 1,
    from = 3,
    to = 7,
    values = [],
    prefix = '',
    postfix = '',
    vertical = false,
    interval = true,
    marker = true,
    scale = true,
    color = '#1565C0',
  }: PluginProps,
): PluginApi {
  if (values.length !== 0) {
    max = values.length - 1;
    min = 0;
    step = 1;

    if (from && to) {
      from = values.indexOf(from);
      to = values.indexOf(to);
    }
  }

  prefix = makeValueLikeCallback(prefix);
  postfix = makeValueLikeCallback(postfix);

  const userDefinedProps: IRangeSliderStoreState = {
    fixedValues: values.map(String),
    value: [from, to],
    min: min,
    max: max,
    step: step,
    prefix,
    postfix,
    vertical,
    intervalMode: interval,
    markerVisibility: marker,
    trackScaleVisibility: scale,
    primaryColor: color,
  };

  const componentStore = createRangeSlider(this.get(0), userDefinedProps);

  return {
    subscribe(cb: (state: PluginProps) => void) {
      componentStore.subscribe(state => {
        cb({
          min: state.min,
          max: state.max,
          step: state.step,
          from: state.value[0],
          to: state.value[1],
          values: state.fixedValues,
          prefix: state.prefix,
          postfix: state.postfix,
          vertical: state.vertical,
          interval: state.intervalMode,
          marker: state.markerVisibility,
          scale: state.trackScaleVisibility,
          color: state.primaryColor,
        });
      });
    },

    setFixedValues(value) {
      if (value.length > 0) {
        const { fixedValues } = componentStore.getState();

        if (value !== fixedValues) {
          componentStore.dispatch({
            name: actionNames.CHANGE_FIXED_VALUES,
            value,
          });
        }
      }
    },

    setLeftValue(value) {
      const state = componentStore.getState();

      if (value !== state.value[0])
        componentStore.dispatch({ name: actionNames.CHANGE_LEFT_VALUE, value });
    },

    setRightValue(value) {
      const state = componentStore.getState();

      if (value !== state.value[1])
        componentStore.dispatch({
          name: actionNames.CHANGE_RIGHT_VALUE,
          value,
        });
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
      const { min } = componentStore.getState();

      if (value !== min)
        componentStore.dispatch({ name: actionNames.CHANGE_MIN, value });
    },

    setMax(value) {
      const { max } = componentStore.getState();

      if (value !== max)
        componentStore.dispatch({ name: actionNames.CHANGE_MAX, value });
    },

    setStep(value) {
      const { step } = componentStore.getState();

      if (value !== step)
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
      const { primaryColor } = componentStore.getState();

      if (value !== primaryColor) {
        if (value.startsWith('#')) {
          const substringValue = value.substr(1);

          if (substringValue.length === 3 || substringValue.length === 6) {
            componentStore.dispatch({
              name: actionNames.CHANGE_PRIMARY_COLOR,
              value,
            });
          }
        }
      }
    },
  };
}

export { rangeSlider };
