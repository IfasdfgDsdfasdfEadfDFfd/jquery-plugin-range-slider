import { createRangeSlider } from './components';
import { actions, IRangeSliderStore } from './components/reducer';


interface PluginApi {
  subscribe(cb: (state: IRangeSliderStore) => void): void;
  setLeftValue(value: number): void;
  setRightValue(value: number): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setStep(value: number): void;
  setOrientVertical(value: boolean): void;
  setMarkerVisibility(value: boolean): void;
  setIntervalMode(value: boolean): void;
}

function rangeSlider(this: JQuery, props: Partial<IRangeSliderStore> = {}): PluginApi {
  const store = createRangeSlider(this.get(0), props);

  return {
    subscribe(cb: (state: IRangeSliderStore) => void) {
      store.subscribe(cb);
    },

    setLeftValue(value: number) {
      store.dispatch({type: actions.CHANGE_LEFT_VALUE, value});
    },

    setRightValue(value: number) {
      store.dispatch({type: actions.CHANGE_RIGHT_VALUE, value});
    },

    setMin(value: number) {
      store.dispatch({type: actions.CHANGE_MIN, value});
    },

    setMax(value: number) {
      store.dispatch({type: actions.CHANGE_MAX, value});
    },

    setStep(value: number) {
      store.dispatch({type: actions.CHANGE_STEP, value});
    },

    setOrientVertical(value: boolean) {
      store.dispatch({type: actions.CHANGE_ORIENT, value});
    },

    setMarkerVisibility(value: boolean) {
      store.dispatch({type: actions.CHANGE_MARKER_VISIBILITY, value});
    },

    setIntervalMode(value: boolean) {
      store.dispatch({type: actions.CHANGE_INTERVAL_MODE, value});
    },
  };
}

export { rangeSlider };
