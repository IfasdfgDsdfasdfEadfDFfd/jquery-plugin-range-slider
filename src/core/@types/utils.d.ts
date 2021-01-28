type ObserverListener<T> = (value: T) => void;
type UnsubscribeListener = () => void;
type Observer<T> = (initState: T) => ObserverInterface<T>;

interface ObserverInterface<T> {
  push(nextState: T): void;
  subscribe(listener: ObserverListener<T>): UnsubscribeListener;
  idleCrank(): void;
}
