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

[store data flow picture](./store-data-flow.svg)

---

## Examples

### initState

```javascript
const initState = {
  value: 0,
  title: 'awesome title',
};
```

### Actions

```javascript
const INCREMENT = {
  name: '@INCREMENT',
  value: null, // anyway should persist
};
```

```javascript
const CHANGE_TITLE = (nextTitle) => {
  name: '@CHANGE_TITLE',
  value: nextTitle,
};
```

### Reducer

```javascript
const reducer = (state, action) => {
  switch (action.name) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case CHANGE_TITLE:
      return { ...state, title: action.value };
    default:
      return state; // if unknown action name return prevision state
  }
};
```

### Validator

```javascript
const NotStringTitleValidator = (action) {
  if (action.name === CHANGE_TITLE.name) {
    if (typeof action.value !== 'string') {
      return {
        name: '@CATCH_NOT_STRING_TITLE',
        value: action.value,
      }
    }
    // Otherwise return unmodified action
    return return action;
  }
}

```

### Create Store

```javascript
const store = createStore(initState, reducer, [NotStringTitleValidator]);
```

### Usage Store

```javascript
store.subscribe(state => state); // initState;

store.coldStart(); // pass actual state to listeners
store.dispatch(INCREMENT); // increment store.value;
store.dispatch(CHANGE_TITLE('next title')); // change store.title;
store.dispatch(CHANGE_TITLE(null)); // don't change state because NotStringTitleValidator catch that case;

const state = store.getState(); // have no side effects, just return current state;
```

---

Next reading [View](./view.md).
