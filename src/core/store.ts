/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fsd/hof-name-prefix */
type Listener<T> = (state: T) => void;

type Action = {
  name: string;
  value: any;
};

type Reducer<TState> = (action: Action, state: TState) => TState;

type Store<TState> = {
  dispatch: (action: Action) => void;
  getState: () => TState;
  subscribe: (listener: Listener<TState>) => () => void;
  coldStart: () => void;
};

type Validator = (action: Action) => Action;

function createStore<TState>(
  initState: TState,
  reducer: Reducer<TState>,
  validators: Validator[] = [],
): Store<TState> {
  const listeners: Listener<TState>[] = [];
  let _state = initState;

  const setNextState = (nextState: TState) => {
    _state = nextState;
  };

  const getState = () => {
    return _state;
  };

  const dispatch = (action: Action) => {
    const prevState = getState();
    const validatedAction = validators.reduce(
      (action, validator) => validator(action),
      action,
    );
    setNextState(reducer(validatedAction, prevState));
    listeners.forEach(listener => listener(getState()));
  };

  const subscribe = (listener: Listener<TState>) => {
    const index = listeners.push(listener) - 1;
    // unsubscribe
    return () => listeners.splice(index, 1);
  };

  const coldStart = () => {
    dispatch({ name: '@COLD_START', value: null });
  };

  return {
    dispatch,
    getState,
    subscribe,
    coldStart,
  };
}

function NaNValidator(action: Action): Action {
  if (typeof action.value === 'number') {
    if (isNaN(action.value)) {
      return {
        name: '@NAN_VALIDATOR_CATCH',
        value: {
          from: action.name,
        },
      };
    }
  }

  return action;
}

export {
  Listener,
  Action,
  Reducer,
  Store,
  Validator,
  createStore,
  NaNValidator,
};
