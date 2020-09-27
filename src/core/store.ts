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
};

export type Validator = (action: Action) => Action;


export function createStore<T>(
  initState: T,
  reducer: Reducer,
  plugins: {
    pre?: Plugin<T>[],
    post?: Plugin<T>[],
  } = {},
  validators: Validator[] = [],
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
    const validatedAction = validators.reduce((action, validator) => validator(action), action);
    setNextState(reducer(validatedAction, prevState));
    listeners.forEach(listener => listener(getState()));
  };

  const subscribe = (listener: Listener) => {
    const index = listeners.push(listener) - 1;
    listener(getState());
    // unsubscribe
    return () => listeners.splice(index, 1);
  };

  return { dispatch, getState, subscribe };
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


export function NaNValidator(action: Action): Action {
  if (isNaN(action.value)) {
    return {
      type: '@NAN_VALIDATOR_CATCH',
      value: {
        from: action.type,
      }
    };
  };

  return action;
}
