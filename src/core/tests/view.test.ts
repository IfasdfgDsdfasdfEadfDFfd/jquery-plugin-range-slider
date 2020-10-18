import { View } from "../view";

describe('test view', () => {
  test('should have children', () => {
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
});
