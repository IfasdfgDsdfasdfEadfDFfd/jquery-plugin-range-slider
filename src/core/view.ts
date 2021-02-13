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

  attachAttrs(attrs: ViewAttrs): void {
    Object.entries(attrs).forEach(([name, value]) => {
      this.nativeElement.setAttribute(name, value);
    });
  }

  render(_props: TProps): void {
    throw new Error('Method not implemented.');
  }
}

class ContainerView<TProps extends ViewProps> extends View<TProps> {
  childViewClass!: ViewConstructable;

  render(props: TProps): void {
    const { iterator, restProps } = this.getProps(props);

    iterator.forEach((item, index) => {
      const props = { ...item, ...restProps };

      if (!this.children[index]) {
        this.children[index] = new this.childViewClass();
        this.children[index].init(this.nativeElement);
      }

      this.children[index].render(props);
    });
  }

  getProps(_props: TProps): ContainerViewProps {
    throw new Error('Method not Implemented!');
  }
}

export { View, ContainerView };
