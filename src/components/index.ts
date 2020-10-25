import { RangeSlider } from "./range-slider/range-slider.view";
import { createStore, loadFromLocalStoragePlugin, NaNValidator, saveToLocalStoragePlugin, Store } from "../core";
import { IRangeSliderStore, rangeSliderStoreReducer } from "./reducer";


function createRangeSlider(root: HTMLElement, initStoreValue: Partial<IRangeSliderStore>): Store<IRangeSliderStore> {
  const STORE_ID = 'range-sldider-store-id';
  const INIT_VALUE: IRangeSliderStore = Object.assign({
    min: 0,
    max: 100,
    step: 5,
    value: [20, 80],
    vertical: false,
    intervalMode: true,
    markerVisibility: false,
    trackScaleVisibility: true,
  }, initStoreValue);

  const store = createStore<IRangeSliderStore>(INIT_VALUE, rangeSliderStoreReducer, {
    pre: [loadFromLocalStoragePlugin(STORE_ID)],
    post: [saveToLocalStoragePlugin(STORE_ID)],
  }, [NaNValidator]);

  const rangeSlider = new RangeSlider(store);
  root.appendChild(rangeSlider.root.element);

  store.coldStart();

  return store;
}


export {
  createRangeSlider,
}
