/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fsd/hof-name-prefix */

import { Observer } from './utils';

function createStore<TStoreState>(
  initState: TStoreState,
  reducer: StoreReducer<TStoreState>,
  validators: StoreValidator[] = [],
): Store<TStoreState> {
  let state: TStoreState;

  const observer = Observer<TStoreState>(initState);
  observer.subscribe((nextState: TStoreState) => (state = nextState));

  const getState = () => {
    return state;
  };

  const dispatch = (action: StoreAction) => {
    const validatedStoreAction = validators.reduce(
      (action, validator) => validator(action),
      action,
    );
    observer.push(reducer(validatedStoreAction, state));
  };

  const coldStart = () => {
    observer.idleCrank();
    dispatch({ name: '@COLD_START', value: state });
  };

  const subscribe = (listener: ObserverListener<TStoreState>): UnsubscribeListener => {
    return observer.subscribe(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
    coldStart,
  };
}

function NaNValidator(action: StoreAction): StoreAction {
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

export { createStore, NaNValidator };
