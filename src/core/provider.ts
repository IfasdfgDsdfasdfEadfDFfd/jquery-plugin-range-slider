import { Store } from "./";
import { View } from "./view";


export abstract class Provider<TStore, TElements extends {}> {
  readonly elements = {} as TElements;
  private _root: View|undefined;

  constructor(store: Store<TStore>) {
    this.init(store);
    store.subscribe((state: TStore) => this.render(state));
  }

  set root(view: View) {
    this._root = view;
  }

  get root(): View {
    return this._root || new View({children: Object.values(this.elements)});
  }

  abstract init(store: Store<TStore>): void;
  abstract render(state: TStore): void;
}
