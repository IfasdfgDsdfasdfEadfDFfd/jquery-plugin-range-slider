class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  attachChildComponents(components: ComponentInterface[]): void {
    this.view.init();

    for (const component of components) {
      this.model.link(component.model);
      component.view.init(this.view.nativeElement);
      component.controller.listen(this.model, component.view);
    }
  }

  attachToDocument(root: HTMLElement): void {
    root.appendChild(this.view.nativeElement);
    this.controller.listen(this.model, this.view);
    this.model.coldStart();
  }
}

export { Component };
