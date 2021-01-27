interface IViewProps {
  tag?: string;
  attrs: { [key: string]: string };
  children: Array<View | string>;
}

type EventCallback = (event: Event) => void;

class View<TParent extends View = any> {
  readonly tag: string;
  readonly nativeElement: HTMLElement;

  focusClassName = '';
  hoverClassName = '';
  hidingClassName = '';

  isFocused!: boolean;
  isHovered!: boolean;
  isVisible!: boolean;

  throwErrorIfHookNotImplemented = false;

  parent!: TParent;
  children: IViewProps['children'];
  attrs: IViewProps['attrs'];

  constructor({ tag, attrs, children }: IViewProps) {
    this.tag = tag || 'div';
    this.children = children;
    this.attrs = attrs;
    this.nativeElement = document.createElement(this.tag);

    Object.keys(this.attrs).reduce((el, key) => {
      const value = this.attrs[key];
      el.setAttribute(key, value);
      return el;
    }, this.nativeElement);

    this.appendChildren(children);
  }

  get selfWidth(): number {
    return this.nativeElement.offsetWidth;
  }

  get parentWidth(): number {
    return this.nativeElement.parentElement?.clientWidth || 0;
  }

  set focused(value: boolean) {
    if (this.focusClassName)
      this.nativeElement.classList.toggle(this.focusClassName, value);
    this.isFocused = value;
    this.handleFocusChange();
  }

  set hovered(value: boolean) {
    if (this.hoverClassName)
      this.nativeElement.classList.toggle(this.hoverClassName, value);
    this.isHovered = value;
    this.handleHoverChange();
  }

  set visible(value: boolean) {
    if (this.hidingClassName)
      this.nativeElement.classList.toggle(this.hidingClassName, !value);
    this.isVisible = value;
    this.handleVisibilityChange();
  }

  appendChildren(children: IViewProps['children']): void {
    children?.reduce((el, child) => {
      if (typeof child === 'string') {
        const text = document.createTextNode(child);
        el.appendChild(text);
      } else {
        child.parent = this;
        el.appendChild(child.nativeElement);
      }

      return el;
    }, this.nativeElement);
  }

  replaceChildren(children: IViewProps['children']): void {
    this.nativeElement.innerHTML = '';
    this.appendChildren(children);
    this.children = children;
  }

  handleViewFocusIn(cb: EventCallback): void {
    this.nativeElement.addEventListener('focusin', cb);
  }

  handleViewFocusOut(cb: EventCallback): void {
    this.nativeElement.addEventListener('focusout', cb);
  }

  handleViewMouseIn(cb: EventCallback): void {
    this.nativeElement.addEventListener('mouseenter', cb);
  }

  handleViewMouseOut(cb: EventCallback): void {
    this.nativeElement.addEventListener('mouseleave', cb);
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
