# View

[source code](https://github.com/patchwork-body/jquery-plugin-range-slider/blob/master/src/core/view.ts)

## Basic Usage

View main class to communicate with DOM.

```javascript
import { View } from './src/core/view.ts';
```

View class expecting receive object with fields:

- **tag**, // html tag name as string
- **attrs**, // html element attributes as js object
- **children**, // array of View or strings,

For example let's create button element

```javascript
const view = new View({
  tag: 'button',
  attrs: {
    id: 'js-pay-button-id',
    class: 'pay-button--blue',
    type: 'submit',
    disabled: true,
  },
  children: ['get item'],
});
```

View can be extended vie subclass like this:

```javascript
class Link extends View {
  constructor(text, url) {
    super({
      tag: 'a',
      attrs: {
        href: url,
        class: 'link--external',
      },
      children: [text],
    });
  }

  onClick(clickHandler) {
    // this.element always links to native HTMLElement
    this.element.addEventListener('click', clickHandler);
  }
}

const link = new Link('google', 'https://www.google.com');

link.onClick(event => {
  event.preventDefault();
});
```

## View class API

### Definition

Append children to existing.

`appendChildren(children: [View or string]): void;`

### Usage Example

```javascript
view.appendChildren([view1, view2, viewN, ...]);
view.appendChildren(['string', 'also string', ...]);
```

### Definition

Replace existing children.

`replaceChildren(children: [View or string]): void;`

### Usage Example

```javascript
view.replaceChildren([view1, view2, viewN, ...]);
view.replaceChildren(['string', 'also string', ...]);
```

### Definition

Register handler for `focusin` html event.

`handleViewFocusIn(handler: function): void;`

### Usage Example

```javascript
view.handleViewFocusIn(event => event.target.value);
```

### Definition

Register handler for `focusout` html event.

`handleViewFocusOut(handler: function): void;`

### Usage Example

```javascript
view.handleViewFocusOut(event => event.target.value);
```

### Definition

Register handler for `mouseenter` html event.

`handleViewMouseIn(handler: function): void;`

### Usage Example

```javascript
view.handleViewMouseIn(event => event.target.value);
```

### Definition

Register handler for `mouseleave` html event.

`handleViewMouseIn(handler: function): void;`

### Usage Example

```javascript
view.handleViewMouseOut(event => event.target.value);
```

---

Next reading [Provider](./provider.md).
