import { Store } from "./";
import { View } from "./view";


export abstract class Provider<TStore, TElements> {
  readonly elements = {} as TElements;
  private _root: View|undefined;

  constructor(store: Store<TStore, unknown>) {
    this.init(store);
    store.subscribe((state: TStore) => this.render(state));
  }

  set root(view: View) {
    this._root = view;
  }

  get root(): View {
    return this._root || new View({attrs: {}, children: Object.values(this.elements)});
  }

  abstract init(store: Store<TStore, unknown>): void;
  abstract render(state: TStore): void;
}
