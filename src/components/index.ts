import { RangeSlider } from './range-slider';
import {
  createStore,
  // loadFromLocalStoragePlugin,
  NaNValidator,
  // saveToLocalStoragePlugin,
  Store,
} from '../core';
import { IRangeSliderState, rangeSliderStoreReducer } from './reducer';

function createRangeSlider(
  root: HTMLElement,
  initStoreValue: IRangeSliderState,
): Store<IRangeSliderState> {
  // const STORE_ID = `store-for-${root.id}`;

  const store = createStore<IRangeSliderState>(
    initStoreValue,
    rangeSliderStoreReducer,
    {
      // pre: [loadFromLocalStoragePlugin(STORE_ID)],
      // post: [saveToLocalStoragePlugin(STORE_ID)],
    },
    [NaNValidator],
  );

  const rangeSlider = new RangeSlider(store);
  root.appendChild(rangeSlider.root.element);

  store.coldStart();

  return store;
}

export { createRangeSlider };
