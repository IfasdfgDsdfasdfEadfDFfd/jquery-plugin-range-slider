import { View } from '../view';

describe('test view', () => {
  test('should has children as string', () => {
    const CHILDREN = new Array(3).fill('some text data');
    const NEW_CHILDREN = new Array(5).fill('some text data');

    const view = new View({
      tag: 'div',
      attrs: {},
      children: CHILDREN,
    });

    expect(view.children?.length).toEqual(CHILDREN.length);

    view.replaceChildren(NEW_CHILDREN);
    expect(view.children?.length).toEqual(NEW_CHILDREN.length);
  });

  test('should has children as View', () => {
    const VIEW_PARAMS = { tag: 'div', attrs: {}, children: [] };
    const CHILDREN = new Array(3).fill(new View(VIEW_PARAMS));
    const NEW_CHILDREN = new Array(5).fill(new View(VIEW_PARAMS));

    const view = new View({
      tag: 'div',
      attrs: {},
      children: CHILDREN,
    });

    expect(view.children?.length).toEqual(CHILDREN.length);

    view.replaceChildren(NEW_CHILDREN);
    expect(view.children?.length).toEqual(NEW_CHILDREN.length);
  });

  test('should have attrs', () => {
    const ATTRS = {
      class: 'some-class-name',
    };

    const view = new View({
      tag: 'div',
      attrs: ATTRS,
      children: [],
    });

    expect(view.attrs).toBe(ATTRS);
  });

  test('throw NotImplementedError', () => {
    const view = new View({ tag: 'div', attrs: {}, children: [] });

    // triggering event dispatchers has no effect
    view.hovered = true;
    view.focused = true;
    view.visible = true;

    view.throwErrorIfHookNotImplemented = true;

    expect(() => (view.hovered = true)).toThrow();
    expect(() => (view.focused = true)).toThrow();
    expect(() => (view.visible = true)).toThrow();
  });
});
