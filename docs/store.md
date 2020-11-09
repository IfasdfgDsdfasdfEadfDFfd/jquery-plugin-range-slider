# Store

[source code](https://github.com/unpredictable-username/jquery-plugin-range-slider/blob/master/src/core/store.ts)

To create store you need to import

```javascript
import { createStore } from './src/core/store.ts';
```

`createStore` is a main function that takes initState, reducer and validators list. Let's see each one in details.

- initState - first argument, can be any type but should be consistent like sql database table if row (field) has been created its should persist.
- reducer - passed as second argument, its should be a function
  with call signature `reducer(state, action) => state;` where
  `state` have same type that `initState` have, action should be
  object with only two field: name as string and value that can be
  any type. As result reducer should produce next state and can be implemented as a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine).
- validators - third argument and also last of them, list of functions that
  validate `Actions` dispatched to store, receive `Action` as input, return
  `Action` as output.

`createStore` function return object that expose some api to communicate with store:

- first of all `getStore()` function obviously return current store state and that all.
- `subscribe(cb: Listener) => unsubscribe()` to get actual data every time state has been updated you should subscribe to store and pass callback as argument, also subscribe return function its calling remove your callback from store.
- `dispatch(action: Action)` function that takes action as argument and pass it to reducer that on its own turn produce next value and that event generates calling listeners.
- `coldStart()` simple helpful function its task to force store call every listener.

Next reading [View](./view.md).
