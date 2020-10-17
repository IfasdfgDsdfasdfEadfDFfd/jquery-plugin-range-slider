import { createStore } from "../store";

describe('store test', () => {
  const INIT_STATE = 'INIT_STATE';
  const NEXT_STATE = 'NEXT_STATE';

  const REDUCER = jest.fn(x => x.value);
  const ACTION = jest.fn();
  ACTION.mockReturnValue({
    name: 'action_name',
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
});
