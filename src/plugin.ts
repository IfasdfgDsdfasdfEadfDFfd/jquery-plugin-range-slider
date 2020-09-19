import { IRangeSliderStore, RangeSlider } from './components';
import { actions } from './components/reducer';


export function createRangeSlider(this: JQuery, props?: IRangeSliderStore) {
  const rangeSlider = new RangeSlider(this.get(0), props);

  return {
    subscirbe(cb: (state: any) => void) {
      rangeSlider.store.subscribe(cb);
    },

    setValue(value: [number, number]) {
      rangeSlider.store.dispatch({type: actions.CHANGE_VALUE, value});
    },

    setMin(value: number) {
      rangeSlider.store.dispatch({type: actions.CHANGE_MIN, value});
    },

    setMax(value: number) {
      rangeSlider.store.dispatch({type: actions.CHANGE_MAX, value});
    },

    setStep(value: number) {
      rangeSlider.store.dispatch({type: actions.CHANGE_STEP, value});
    },

    setOrientVertical(value: boolean) {
      rangeSlider.store.dispatch({type: actions.CHANGE_ORIENT, value});
    },

    setMarkerVisibility(value: boolean) {
      rangeSlider.store.dispatch({type: actions.CHANGE_MARKER_VISIBILITY, value});
    },

    setIntervalMode(value: boolean) {
      rangeSlider.store.dispatch({type: actions.CHANGE_INTERVAL_MODE, value});
    },
  };
}
