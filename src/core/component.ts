class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  childComponents: ComponentInterface[] = [];

  init(initData: Record<string, ModelData>): void {
    this.model.init(initData[this.model.name]);
    this.view.init();

    for (const component of this.childComponents) {
      component.model.init(initData[component.model.name]);
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

  attachToDocument(root: HTMLElement, initData: Record<string, ModelData>): void {
    this.init(initData);
    this.addSubscriber(this);
    this.model.coldStart();
    root.appendChild(this.view.nativeElement);
  }
}

export { Component };
