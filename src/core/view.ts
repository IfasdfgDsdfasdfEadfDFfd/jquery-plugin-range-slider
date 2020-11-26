interface IViewProps {
  tag?: string;
  attrs: { [key: string]: string };
  children: Array<View | string>;
}

type EventCallback = (event: Event) => void;

class View {
  readonly tag: string;
  readonly element: HTMLElement;

  focusClassName = '';
  hoverClassName = '';
  hidingClassName = '';

  isFocused!: boolean;
  isHovered!: boolean;
  isVisible!: boolean;

  throwErrorIfHookNotImplemented = false;

  children: IViewProps['children'];
  attrs: IViewProps['attrs'];

  constructor({ tag, attrs, children }: IViewProps) {
    this.tag = tag || 'div';
    this.children = children;
    this.attrs = attrs;
    this.element = document.createElement(this.tag);

    Object.keys(this.attrs).reduce((el, key) => {
      const value = this.attrs[key];
      el.setAttribute(key, value);
      return el;
    }, this.element);

    this.appendChildren(children);
  }

  appendChildren(children: IViewProps['children']): void {
    children?.reduce((el, child) => {
      if (typeof child === 'string') {
        const text = document.createTextNode(child);
        el.appendChild(text);
      } else {
        el.appendChild(child.element);
      }

      return el;
    }, this.element);
  }

  replaceChildren(children: IViewProps['children']): void {
    this.element.innerHTML = '';
    this.appendChildren(children);
    this.children = children;
  }

  onFocusIn(cb: EventCallback): void {
    this.element.addEventListener('focusin', cb);
  }

  onFocusOut(cb: EventCallback): void {
    this.element.addEventListener('focusout', cb);
  }

  onMouseIn(cb: EventCallback): void {
    this.element.addEventListener('mouseenter', cb);
  }

  onMouseOut(cb: EventCallback): void {
    this.element.addEventListener('mouseleave', cb);
  }

  set focused(value: boolean) {
    if (this.focusClassName)
      this.element.classList.toggle(this.focusClassName, value);
    this.isFocused = value;
    this.handleFocusChange();
  }

  set hovered(value: boolean) {
    if (this.hoverClassName)
      this.element.classList.toggle(this.hoverClassName, value);
    this.isHovered = value;
    this.handleHoverChange();
  }

  set visible(value: boolean) {
    if (this.hidingClassName)
      this.element.classList.toggle(this.hidingClassName, value);
    this.isVisible = value;
    this.handleVisibilityChange();
  }

  handleFocusChange(): void {
    if (this.throwErrorIfHookNotImplemented)
      throw new Error('Not Implemented!');
  }

  handleHoverChange(): void {
    if (this.throwErrorIfHookNotImplemented)
      throw new Error('Not Implemented!');
  }

  handleVisibilityChange(): void {
    if (this.throwErrorIfHookNotImplemented)
      throw new Error('Not Implemented!');
  }
}

export { IViewProps, EventCallback, View };
