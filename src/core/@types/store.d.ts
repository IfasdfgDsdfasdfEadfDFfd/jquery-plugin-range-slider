type StoreAction = {
  name: string;
  value: any;
};
type StoreReducer<TStoreState> = (action: StoreAction, state: TStoreState) => TStoreState;
type StoreValidator = (action: StoreAction) => StoreAction;

interface Store<TStoreState> {
  getState(): TStoreState;
  coldStart(): void;
  dispatch(action: StoreAction): void;
  subscribe(listener: ObserverListener<TStoreState>): UnsubscribeListener;
}
