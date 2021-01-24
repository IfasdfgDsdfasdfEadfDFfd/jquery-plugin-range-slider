import { Store } from '@core';
import { View } from '@core';
import { Listener } from './store';
import { memo } from './utils';

abstract class Provider<TStoreState, TElements> {
  readonly elements = {} as TElements;
  private _root: View | undefined;

  constructor(store: Store<TStoreState>) {
    this.init(store);
    store.subscribe((state: TStoreState) => this.render(state));
  }

  set root(view: View) {
    this._root = view;
  }

  get root(): View {
    return (
      this._root ||
      new View({ attrs: {}, children: Object.values(this.elements) })
    );
  }

  useStore(store: Store<TStoreState>, listener: Listener<TStoreState>) {
    store.subscribe(memo(listener));
  }

  abstract init(store: Store<TStoreState>): void;
  abstract render(state: TStoreState): void;
}

export { Provider };
