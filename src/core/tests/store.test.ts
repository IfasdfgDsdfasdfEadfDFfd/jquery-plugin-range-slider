import { createStore, NaNValidator } from "../store";

describe('store test', () => {
  const INIT_STATE = 'INIT_STATE';
  const NEXT_STATE = 'NEXT_STATE';

  const REDUCER = jest.fn(x => x.value);
  const ACTION = jest.fn();
  ACTION.mockReturnValue({
    type: 'action_name',
    value: NEXT_STATE,
  });

  test('reducer should be called once for every dispatch call', () => {
    const store = createStore(INIT_STATE, REDUCER);
    store.dispatch(ACTION());

    expect(REDUCER.mock.calls.length).toEqual(1);

    store.dispatch(ACTION());
    store.dispatch(ACTION());

    expect(REDUCER.mock.calls.length).toEqual(3);
  });

  test('getStore() return new state after dispatch has been called', () => {
    const store = createStore(INIT_STATE, REDUCER);
    expect(store.getState()).toEqual(INIT_STATE);

    store.dispatch(ACTION());
    expect(store.getState()).toEqual(NEXT_STATE);
  });

  test('listener will be called immediately after subscribe', () => {
    const store = createStore(INIT_STATE, REDUCER);
    const LISTENER = jest.fn(x => x);

    store.subscribe(LISTENER);

    expect(LISTENER.mock.calls.length).toEqual(1);
  });

  test('all listeners should be called every time dispatch was called', () => {
    const store = createStore(INIT_STATE, REDUCER);
    const LISTENER = jest.fn(x => x);

    store.subscribe(LISTENER);
    expect(LISTENER.mock.calls.length).toEqual(1);

    store.dispatch(ACTION());
    expect(LISTENER.mock.calls.length).toEqual(2);
  });

  describe('test store validators', () => {
    test('NaNValidator catch all action with {value: NaN}', () => {
      const ACTION_NAN_VALUE = {
        type: 'ACTION_NAME',
        value: NaN,
      };
      const LISTENER = jest.fn(x => x);

      const store = createStore(INIT_STATE, REDUCER, {}, [ NaNValidator ]);

      store.subscribe(LISTENER);

      store.dispatch(ACTION_NAN_VALUE);
      expect(LISTENER.mock.calls[1][0].from).toEqual(ACTION_NAN_VALUE.type);
    });
  });
});

