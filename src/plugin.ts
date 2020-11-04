import { createRangeSlider } from './components';
import { actionNames, IRangeSliderState } from './components/reducer';

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

function rangeSlider(
  this: JQuery,
  props: Partial<IRangeSliderState> = {},
): PluginApi {
  const componentStore = createRangeSlider(this.get(0), props);

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
