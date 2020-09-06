import { Store } from './';

export interface IViewProps {
  tag?: string,
  attrs?: any,
  children?: Array<View|string>,
}

export type EventCallback = (event: any) => void;


export class View {
  tag: string;
  element: HTMLElement;
  store: (Store|null) = null;

  constructor({ tag, attrs, children }: IViewProps = {}) {
    this.tag = tag || 'div';
    attrs = attrs || {};
    this.element = document.createElement(this.tag);

    Object.keys(attrs).reduce((el, key) => {
      this.element.setAttribute(key, attrs[key]);
      return el;
    }, this.element);

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
}
