import { RangeSlider } from './range-slider';
import { createStore, NaNValidator, Store } from '../core';
import { IRangeSliderState, rangeSliderStoreReducer } from './reducer';

function createRangeSlider(
  root: HTMLElement,
  initStoreValue: IRangeSliderState,
): Store<IRangeSliderState> {
  const store = createStore<IRangeSliderState>(
    initStoreValue,
    rangeSliderStoreReducer,
    [NaNValidator],
  );

  const rangeSlider = new RangeSlider(store);
  root.appendChild(rangeSlider.root.element);

  store.coldStart();

  return store;
}

export { createRangeSlider };
