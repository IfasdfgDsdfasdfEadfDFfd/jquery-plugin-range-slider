import { gigletAction } from './utils';

class Component implements ComponentInterface {
  view!: ViewInterface;
  model!: ModelInterface;
  controller!: ControllerInterface;

  childComponents: ComponentInterface[] = [];

  init(): void {
    this.view.init();
    this.addSubscriber(this);

    for (const component of this.childComponents) {
      component.view.init(this.view.nativeElement);
      this.model.linkModel(component.model);
      this.addSubscriber(component);
    }
  }

  addSubscriber(component: ComponentInterface): void {
    this.model.subscribe(data => {
      component.view.render({
        ...component.controller.mapState(data),
        ...component.controller.mapDispatch({
          [`${this.model.name}Dispatch`]: this.model.dispatch.bind(this.model),

          ...this.childComponents.reduce((dispatchers, component) => {
            return {
              ...dispatchers,
              [`${component.model.name}Dispatch`]: component.model.dispatch.bind(component.model),
            };
          }, {}),
        }),
      });
    });
  }

  attachToDocument(root: HTMLElement): void {
    this.init();
    root.appendChild(this.view.nativeElement);
  }

  coldStart(initData: Record<string, ModelData>): void {
    this.model.init(initData);
    this.model.dispatch(gigletAction());
  }
}

export { Component };
