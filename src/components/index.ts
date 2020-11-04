import { RangeSlider } from './range-slider';
import {
  createStore,
  loadFromLocalStoragePlugin,
  NaNValidator,
  saveToLocalStoragePlugin,
  Store,
} from '../core';
import { IRangeSliderState, rangeSliderStoreReducer } from './reducer';

import styles from '../exports.scss';

function createRangeSlider(
  root: HTMLElement,
  initStoreValue: Partial<IRangeSliderState>,
): Store<IRangeSliderState> {
  const STORE_ID = `store-for-${root.id}`;
  const INIT_VALUE: IRangeSliderState = Object.assign(
    {
      min: 0,
      max: 100,
      step: 5,
      value: [20, 80],
      prefix: '',
      postfix: '',
      vertical: false,
      intervalMode: true,
      markerVisibility: false,
      trackScaleVisibility: true,
      primaryColor: styles.primaryColor,
    },
    initStoreValue,
  );

  const store = createStore<IRangeSliderState>(
    INIT_VALUE,
    rangeSliderStoreReducer,
    {
      pre: [loadFromLocalStoragePlugin(STORE_ID)],
      post: [saveToLocalStoragePlugin(STORE_ID)],
    },
    [NaNValidator],
  );

  const rangeSlider = new RangeSlider(store);
  root.appendChild(rangeSlider.root.element);

  store.coldStart();

  return store;
}

export { createRangeSlider };
