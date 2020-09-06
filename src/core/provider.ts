import { View, Store } from "./";
import { IViewProps } from "./view";

export abstract class Provider<TStore> {
  store: Store;
  views: View[];
  container: View;

  constructor(root: HTMLElement, initValue?: TStore, attrs?: IViewProps['attrs']) {
    this.store = this.initStore(initValue);
    this.views = this.initViews(this.store);

    this.container = new View({tag: 'div', attrs: {...attrs}, children: this.views});
    this.initSelf();

    root.appendChild(this.container.element);
  }

  abstract initStore(initValue?: TStore): Store;
  abstract initViews(store: Store): View[];
  abstract initSelf(): void;
}
