import { RangeSlider } from "./range-slider/range-slider.view";
import { createStore, loadFromLocalStoragePlugin, NaNValidator, saveToLocalStoragePlugin } from "../core";
import { IRangeSliderStore, rangeSliderStoreReducer } from "./reducer";


export function createRangeSlider(root: HTMLElement, initStoreValue: Partial<IRangeSliderStore>) {
  const STORE_ID = 'range-sldider-store-id';
  const INIT_VALUE: IRangeSliderStore = Object.assign({
    min: 0,
    max: 100,
    step: 5,
    value: [20, 80],
    vertical: false,
    markerVisibility: false,
    intervalMode: true,
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
