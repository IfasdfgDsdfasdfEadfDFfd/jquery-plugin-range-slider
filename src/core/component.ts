class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  attachChildComponents(components: ComponentInterface[]): void {
    this.view.init();

    for (const component of components) {
      this.model.linkModel(component.model);
      component.view.init(this.view.nativeElement);
      this.addSubscriber(component);
    }
  }

  addSubscriber(component: ComponentInterface): void {
    this.model.subscribe(data => {
      component.view.render({
        ...component.controller.mapState(data),
        ...component.controller.mapDispatch(component.model.dispatch),
      });
    });
  }

  attachToDocument(root: HTMLElement): void {
    root.appendChild(this.view.nativeElement);
    this.addSubscriber(this);
    this.model.coldStart();
  }
}

export { Component };
