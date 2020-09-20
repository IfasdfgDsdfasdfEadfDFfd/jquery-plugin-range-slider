import { createRangeSlider } from './components';
import { actions, IRangeSliderStore } from './components/reducer';


export function rangeSlider(this: JQuery, props: Partial<IRangeSliderStore> = {}) {
  const store = createRangeSlider(this.get(0), props);

  return {
    subscirbe(cb: (state: any) => void) {
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
