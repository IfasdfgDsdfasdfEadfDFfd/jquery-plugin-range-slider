import { Provider } from '../provider';
import { createStore } from '../store';

describe('test provider', () => {
  test('call render every time store updated', () => {
    const STORE = createStore<string>('', () => '');
    const renderHandler = jest.fn();

    class SomeProvider extends Provider<string, unknown> {
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
      name: 'type',
      value: '',
    });

    expect(renderHandler.mock.calls.length).toEqual(2);
  });
});
