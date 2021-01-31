class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  attachChildComponents(components: ComponentInterface[]): void {
    const childViews: ViewInterface[] = [];

    for (const component of components) {
      this.model.link(component.model);
      component.controller.listen(this.model, component.view);
      childViews.push(component.view);
    }

    this.view.attachChildren(childViews);
  }

  attachToDocument(root: HTMLElement): void {
    root.appendChild(this.view.nativeElement);
    this.controller.listen(this.model, this.view);
  }
}

export { Component };
