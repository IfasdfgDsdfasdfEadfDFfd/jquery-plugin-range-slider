interface IViewProps {
  tag?: string;
  attrs: { [key: string]: string };
  children: Array<View | string>;
}

type EventCallback = (event: Event) => void;

class View {
  readonly tag: string;
  readonly element: HTMLElement;

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
}

export { IViewProps, EventCallback, View };
