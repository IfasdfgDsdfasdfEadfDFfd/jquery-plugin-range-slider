# Provider

[source code](https://github.com/patchwork-body/jquery-plugin-range-slider/blob/master/src/core/provider.ts)

Provider is an [abstract class](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes) that create bridge between data store and its representation.
Inherit class should implement `init()` and `render()`.

For example:

```typescript
class ButtonProvider extends Provider<Store,
{ element1: View, element2: View }> {
  init(store: Store) {
    // initialize elements
    this.elements.element1 = new View();
    this.elements.element2 = new View();

    // subscribe to DOM events
    this.elements.handleFocusChange(this.focusHandler);
  }

  // call every time when state was updated
  render(state: Store.getState()) {
    // pass new state to elements
    this.elements.element2.update(state);
  }
}
```

So we can figure it as one direction data flow.
