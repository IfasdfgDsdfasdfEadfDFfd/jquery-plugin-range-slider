import { View } from '@core';

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

  test('register DOM & View event handlers', () => {
    const view = new View({ tag: 'div', attrs: {}, children: [] });

    view.focusClassName = 'focus';
    view.hoverClassName = 'hover';
    view.hidingClassName = 'hide';

    const viewHandlerHoverChange = jest.fn();
    const domHandlerMouseIn = jest.fn();
    const domHandlerMouseOut = jest.fn();

    const viewHandlerFocusChange = jest.fn();
    const domHandlerFocusIn = jest.fn();
    const domHandlerFocusOut = jest.fn();

    const viewHandlerVisibleChange = jest.fn();

    view.handleHoverChange = viewHandlerHoverChange;
    view.handleViewMouseIn(domHandlerMouseIn);
    view.handleViewMouseOut(domHandlerMouseOut);

    view.handleFocusChange = viewHandlerFocusChange;
    view.handleViewFocusIn(domHandlerFocusIn);
    view.handleViewFocusOut(domHandlerFocusOut);

    view.handleVisibilityChange = viewHandlerVisibleChange;

    view.hovered = true;
    expect(view.isHovered).toBe(true);
    expect(view.nativeElement.classList.contains(view.hoverClassName)).toBe(
      true,
    );

    expect(viewHandlerHoverChange).toHaveBeenCalled();
    expect(domHandlerMouseIn).not.toHaveBeenCalled();
    expect(domHandlerMouseOut).not.toHaveBeenCalled();

    view.hovered = false;
    expect(view.isHovered).toBe(false);
    expect(view.nativeElement.classList.contains(view.hoverClassName)).toBe(
      false,
    );

    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(2);
    expect(domHandlerMouseIn).not.toHaveBeenCalled();
    expect(domHandlerMouseOut).not.toHaveBeenCalled();

    view.nativeElement.dispatchEvent(new Event('mouseenter'));

    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(2);
    expect(domHandlerMouseIn).toHaveBeenCalledTimes(1);
    expect(domHandlerMouseOut).not.toHaveBeenCalled();

    view.nativeElement.dispatchEvent(new Event('mouseleave'));

    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(2);
    expect(domHandlerMouseIn).toHaveBeenCalledTimes(1);
    expect(domHandlerMouseOut).toHaveBeenCalledTimes(1);

    view.focused = true;
    expect(view.isFocused).toBe(true);
    expect(view.nativeElement.classList.contains(view.focusClassName)).toBe(
      true,
    );

    expect(viewHandlerHoverChange).toHaveBeenCalled();
    expect(domHandlerFocusIn).not.toHaveBeenCalled();
    expect(domHandlerFocusOut).not.toHaveBeenCalled();

    view.focused = false;
    expect(view.isFocused).toBe(false);
    expect(view.nativeElement.classList.contains(view.focusClassName)).toBe(
      false,
    );

    expect(viewHandlerHoverChange).toHaveBeenCalledTimes(2);
    expect(domHandlerFocusIn).not.toHaveBeenCalled();
    expect(domHandlerFocusOut).not.toHaveBeenCalled();

    view.nativeElement.dispatchEvent(new Event('focusin'));

    expect(viewHandlerFocusChange).toHaveBeenCalledTimes(2);
    expect(domHandlerFocusIn).toHaveBeenCalledTimes(1);
    expect(domHandlerFocusOut).not.toHaveBeenCalled();

    view.nativeElement.dispatchEvent(new Event('focusout'));

    expect(viewHandlerFocusChange).toHaveBeenCalledTimes(2);
    expect(domHandlerFocusIn).toHaveBeenCalledTimes(1);
    expect(domHandlerFocusOut).toHaveBeenCalledTimes(1);

    view.visible = false;
    expect(view.nativeElement.classList.contains(view.hidingClassName)).toBe(
      false,
    );
    expect(viewHandlerVisibleChange).toHaveBeenCalled();
    expect(view.isVisible).toBe(false);

    view.visible = true;
    expect(view.nativeElement.classList.contains(view.hidingClassName)).toBe(
      true,
    );
    expect(viewHandlerVisibleChange).toHaveBeenCalledTimes(2);
    expect(view.isVisible).toBe(true);
  });
});
