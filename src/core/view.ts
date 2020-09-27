export interface IViewProps {
  tag?: string;
  attrs?: any;
  children?: Array<View|string>;
}

export type EventCallback = (event: any) => void;


export class View {
  readonly tag: string;
  readonly element: HTMLElement;

  children: IViewProps['children'];
  attrs: IViewProps['attrs'];

  constructor({ tag, attrs, children }: IViewProps = {}) {
    this.tag = tag || 'div';
    this.children = children;
    this.attrs = attrs || {};
    this.element = document.createElement(this.tag);

    Object.keys(this.attrs).reduce((el, key) => {
      this.element.setAttribute(key, this.attrs[key]);
      return el;
    }, this.element);

    this.appendChildren(children);
  }

  appendChildren(children: IViewProps['children']) {
    children?.reduce((el, child) => {

      if (typeof (child) === 'string') {
        const text = document.createTextNode(child);
        el.appendChild(text);
      } else {
        el.appendChild(child.element)
      }

      return el;
    }, this.element);
  }

  replaceChildren(children: IViewProps['children']) {
    this.element.innerHTML = '';
    this.appendChildren(children);
  }
}
