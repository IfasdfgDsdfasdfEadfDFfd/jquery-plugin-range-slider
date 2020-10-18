/* eslint-disable fsd/hof-name-prefix */
export type Listener<T> = (state: T) => void;

export type Action<T> = {
  type: string,
  value?: T,
};

export type Plugin<T> = (state: T) => T;

export type Reducer<TState, TAction> = (action: Action<TAction>, state: TState) => TState;

export type Store<TState, TAction> = {
  dispatch: (action: Action<TAction>) => void,
  getState: () => TState,
  subscribe: (listener: Listener<TState>) => () => void,
  coldStart: () => void;
};

export type Validator<TReceivedAction, TReturnedAction> = (action: Action<TReceivedAction>) => Action<TReturnedAction>;


export function createStore<TState, TAction>(
  initState: TState,
  reducer: Reducer<TState, TAction>,
  plugins: {
    pre?: Plugin<TState>[],
    post?: Plugin<TState>[],
  } = {},
  validators: Validator<TAction, unknown>[] = [],
): Store<TState, TAction> {
  const listeners: Listener<TState>[] = [];
  let _state = plugins.pre?.reduce((state, plugin) => plugin(state), initState) || initState;

  const setNextState = (nextState: TState) => {
    for (const plugin of plugins.post || []) {
      nextState = plugin(nextState);
    }
    _state = nextState;
  };

  const getState = () => {
    return _state;
  };

  const dispatch = (action: Action<TAction>) => {
    const prevState = getState();
    const validatedAction = validators.reduce((action, validator) => validator(action), action);
    setNextState(reducer(validatedAction, prevState));
    listeners.forEach(listener => listener(getState()));
  };

  // eslint-disable-next-line fsd/hof-name-prefix
  const subscribe = (listener: Listener<TState>) => {
    const index = listeners.push(listener) - 1;
    listener(getState());
    // unsubscribe
    return () => listeners.splice(index, 1);
  };

  const coldStart = () => {
    dispatch({type: '@COLD_START'});
  }

  return { dispatch, getState, subscribe, coldStart };
}


export function loadFromLocalStoragePlugin<T> (key: string): Plugin<T> {
  return (initState: T) => {
    return JSON.parse(window.localStorage.getItem(key) as string) || initState;
  }
}


export function saveToLocalStoragePlugin<T> (key: string): Plugin<T> {
  return (state: T) => {
    window.localStorage.setItem(key, JSON.stringify(state));
    return state;
  };
}

export function NaNValidator<T>(action: Action<T>): Action<{from: string}> | Action<T> {
  if (typeof action.value === 'number') {
    if (isNaN(action.value)) {
      return {
        type: '@NAN_VALIDATOR_CATCH',
        value: {
          from: action.type,
        }
      };
    }
  }

  return action;
}
