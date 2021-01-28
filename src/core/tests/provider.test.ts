import { View, Provider, createStore } from '@core';

describe('test provider', () => {
  let STORE: Store<string>;
  beforeEach(() => {
    STORE = createStore<string>('', action => action.value);
  });

  test('init root View if it was not provided explicitly', () => {
    class SomeProvider extends Provider<string, unknown> {
      init() {}
    }
    const provider = new SomeProvider(STORE);

    expect(provider.root).toBeInstanceOf(View);
    expect(provider.root.nativeElement).toBeInstanceOf(HTMLDivElement);
  });
});
