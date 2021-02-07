class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  childComponents: ComponentInterface[] = [];

  init(): void {
    this.view.init();

    for (const component of this.childComponents) {
      this.model.linkModel(component.model);
      component.view.init(this.view.nativeElement);
      this.addSubscriber(component);
    }
  }

  attachChildComponents(components: ComponentInterface[]): void {
    this.childComponents.concat(components);
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
    this.init();
    this.addSubscriber(this);
    this.model.coldStart();
    root.appendChild(this.view.nativeElement);
  }
}

export { Component };
