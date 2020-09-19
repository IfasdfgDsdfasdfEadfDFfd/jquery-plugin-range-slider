export type Listener = (state: any) => void;

export type Action = {
  type: string,
  value?: any,
};

export type Plugin<T> = (state: T) => T;

export type Reducer = (action: Action, state: any) => any;

export type Store<T> = {
  dispatch: (action: Action) => void,
  getState: () => T,
  subscribe: (listener: Listener) => () => any,
  coldStart: () => void;
};


export function createStore<T>(
  initState: T,
  reducer: Reducer,
  plugins: {
    pre?: Plugin<T>[],
    post?: Plugin<T>[],
}
): Store<T> {
  const listeners: Listener[] = [];
  let _state = plugins.pre?.reduce((state, plugin) => plugin(state), initState) || initState;

  const setNextState = (nextState: any) => {
    for (const plugin of plugins.post || []) {
      nextState = plugin(nextState);
    }
    _state = nextState;
  };

  const getState = () => {
    return _state;
  };

  const dispatch = (action: Action) => {
    const prevState = getState();
    setNextState(reducer(action, prevState));
    listeners.forEach(listener => listener(getState()));
  };

  const coldStart = () => {
    dispatch({type: '@COLD_START'});
  };

  const subscribe = (listener: Listener) => {
    const index = listeners.push(listener) - 1;
    coldStart();
    // unsubscribe
    return () => listeners.splice(index, 1);
  };

  return { dispatch, getState, subscribe, coldStart };
};


export function loadFromLocalStoragePlugin<T> (key: string): Plugin<T> {
  return (initState: T) => {
    return JSON.parse(window.localStorage.getItem(key) as string) || initState;
  }
};


export function saveToLocalStoragePlugin<T> (key: string): Plugin<T> {
  return (state: T) => {
    window.localStorage.setItem(key, JSON.stringify(state));
    return state;
  };
}
