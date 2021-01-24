import { createStore, NaNValidator, Store } from '@core';
import { IRangeSliderStoreState, rangeSliderStoreReducer } from '@store';

import { RangeSlider } from './range-slider';

function createRangeSlider(
  root: HTMLElement,
  initStoreValue: IRangeSliderStoreState,
): Store<IRangeSliderStoreState> {
  const store = createStore<IRangeSliderStoreState>(
    initStoreValue,
    rangeSliderStoreReducer,
    [NaNValidator],
  );

  const rangeSlider = new RangeSlider(store);
  root.appendChild(rangeSlider.root.nativeElement);

  store.coldStart();

  return store;
}

export { createRangeSlider };
