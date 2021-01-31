class View<TProps extends ViewProps> implements ViewInterface {
  nativeElement!: HTMLElement;

  tag = 'div';
  attrs = {};
  children = {};

  initialized = false;

  init(): void {
    this.nativeElement = document.createElement(this.tag);

    this.attachAttrs(this.attrs);
    this.attachChildren(Object.values(this.children));

    this.initialized = true;
  }

  update(_props: TProps): void {
    throw new Error('Method not implemented.');
  }

  render(props: TProps): void {
    this.initialized || this.init();
    this.update(props);
  }

  attachAttrs(attrs: ViewAttrs): void {
    Object.entries(attrs).forEach(([name, value]) => {
      this.nativeElement.setAttribute(name, value);
    });
  }

  attachChildren(children: ViewInterface[]): void {
    for (const child of children) {
      let childNode: Node;

      if (typeof child === 'string') {
        childNode = document.createTextNode(child);
      } else {
        childNode = child.nativeElement;
      }

      this.nativeElement.appendChild(childNode);
    }
  }
}

export { View };
