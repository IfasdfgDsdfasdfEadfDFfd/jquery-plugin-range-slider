import { RangeSlider } from './views';

interface IProps {
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  vertical?: boolean,
  markerVisibility?: boolean,
}

export function createRangeSlider(this: JQuery, props?: IProps) {
  const rangeSlider = new RangeSlider(this.get(0), props);

  return {
    subscirbe(cb: (state: any) => void) {
      rangeSlider.store.subscribe(cb);
    },
    setValue(value: number) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_VALUE, value});
    },

    setMin(value: number) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_MIN, value});
    },

    setMax(value: number) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_MAX, value});
    },

    setStep(value: number) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_STEP, value});
    },

    setOrientVertical(value: boolean) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_ORIENT, value});
    },

    setMarkerVisibility(value: boolean) {
      rangeSlider.store.dispatch({type: RangeSlider.actions.CHANGE_MARKER_VISIBILITY, value});
    },
  };
}
