import { createStore, NaNValidator, Store } from '@core';
import { IRangeSliderState, rangeSliderStoreReducer } from '@store';

import { RangeSlider } from './range-slider';

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
  root.appendChild(rangeSlider.root.nativeElement);

  store.coldStart();

  return store;
}

export { createRangeSlider };
