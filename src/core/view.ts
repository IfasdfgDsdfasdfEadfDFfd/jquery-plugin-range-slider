class View<TProps extends ViewProps> implements ViewInterface {
  nativeElement!: HTMLElement;

  tag = 'div';
  attrs: ViewAttrs = {};
  children: ViewChildren = {};

  init(parentNode?: Node): void {
    this.nativeElement = document.createElement(this.tag);
    this.attachAttrs(this.attrs);

    Object.values(this.children).forEach(child => child.init(this.nativeElement));
    if (parentNode) parentNode.appendChild(this.nativeElement);
  }

  render(_props: TProps): void {
    throw new Error('Method not implemented.');
  }

  attachAttrs(attrs: ViewAttrs): void {
    Object.entries(attrs).forEach(([name, value]) => {
      this.nativeElement.setAttribute(name, value);
    });
  }
}

export { View };
