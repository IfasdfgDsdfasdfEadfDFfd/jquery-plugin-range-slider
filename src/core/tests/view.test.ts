import { View } from '@core';

describe('test view', () => {
  beforeEach(() => (document.body.innerHTML = ''));
  test('view selfWidth', () => {
    const view = new View({ tag: 'div', attrs: {}, children: [] });
    expect(view.selfWidth).toBeDefined();
    expect(view.selfWidth).not.toBeNaN();
  });

  test('view parentWidth', () => {
    const view = new View({ tag: 'div', attrs: {}, children: [] });
    expect(view.parentWidth).toBeDefined();
    expect(view.parentWidth).toEqual(0);
    expect(view.parentWidth).not.toBeNaN();
  });

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

  test('register DOM & View event handlers', () => {
    const view = new View({ tag: 'div', attrs: {}, children: [] });

    view.focusClassName = 'focus';
    view.hoverClassName = 'hover';
    view.hidingClassName = 'hide';

    const viewHandlerHoverChange = jest.fn();
    const viewHandlerFocusChange = jest.fn();
    const viewHandlerVisibleChange = jest.fn();

    view.handleHoverChange = viewHandlerHoverChange;
    view.handleFocusChange = viewHandlerFocusChange;
    view.handleVisibilityChange = viewHandlerVisibleChange;

    view.hovered = true;
    expect(view.isHovered).toBe(true);
    expect(view.nativeElement.classList.contains(view.hoverClassName)).toBe(true);
    expect(viewHandlerHoverChange).toHaveBeenCalled();

    view.hovered = false;
    expect(view.isHovered).toBe(false);
    expect(view.nativeElement.classList.contains(view.hoverClassName)).toBe(false);
    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(2);

    view.nativeElement.dispatchEvent(new Event('mouseenter'));
    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(3);

    view.nativeElement.dispatchEvent(new Event('mouseleave'));
    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(4);

    view.focused = true;
    expect(view.isFocused).toBe(true);
    expect(view.nativeElement.classList.contains(view.focusClassName)).toBe(true);
    expect(viewHandlerFocusChange).toHaveBeenCalled();

    view.focused = false;
    expect(view.isFocused).toBe(false);
    expect(view.nativeElement.classList.contains(view.focusClassName)).toBe(false);
    expect(viewHandlerFocusChange).toHaveBeenCalledTimes(2);

    view.nativeElement.dispatchEvent(new Event('focusin'));
    expect(viewHandlerFocusChange).toHaveBeenCalledTimes(3);

    view.nativeElement.dispatchEvent(new Event('focusout'));
    expect(viewHandlerFocusChange).toHaveBeenCalledTimes(4);

    view.visible = false;
    expect(view.nativeElement.classList.contains(view.hidingClassName)).toBe(true);
    expect(viewHandlerVisibleChange).toHaveBeenCalled();
    expect(view.isVisible).toBe(false);

    view.visible = true;
    expect(view.nativeElement.classList.contains(view.hidingClassName)).toBe(false);
    expect(viewHandlerVisibleChange).toHaveBeenCalledTimes(2);
    expect(view.isVisible).toBe(true);
  });
});
