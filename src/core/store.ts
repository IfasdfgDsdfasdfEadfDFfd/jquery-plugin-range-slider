export type Listener = (state: any) => void;

export type Action = {
  type: string,
  value?: any,
};

export type StateModifier = (initState: any) => any;
export type Middleware = (args: {action: any, state: any}) => {action: Action, state: any};

export type Reducer = (action: Action, state: any) => any;

export type Store = {
  dispatch: (action: Action) => void,
  getState: () => any,
  subscribe: (listener: Listener) => () => any,
  coldStart: () => void;
};


export const createStore = (
  initState: any,
  reducer: Reducer,
): Store => {
  const listeners: Listener[] = [];
  let _state = initState;

  const setNextState = (nextState: any) => {
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
