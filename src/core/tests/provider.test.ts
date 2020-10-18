import { Provider } from "../provider";
import { createStore } from "../store";

describe('test provider', () => {
  test('call render every time store updated', () => {
    const STORE = createStore('', () => '');
    const renderHandler = jest.fn();

    class SomeProvider extends Provider<unknown, unknown> {
      init() {
        // placeholder
      }
      render() {
        renderHandler();
      }
    }

    new SomeProvider(STORE);

    expect(renderHandler.mock.calls.length).toEqual(1);

    STORE.dispatch({
      type: 'type',
    });

    expect(renderHandler.mock.calls.length).toEqual(2);
  });
});
