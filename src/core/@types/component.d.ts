type ChildComponents = ComponentInterface[];

interface ComponentInterface {
  view: ViewInterface;
  model: ModelInterface;
  controller: ControllerInterface;

  childComponents: ComponentInterface[];

  init(initData: ModelData): void;
  addSubscriber(component: ComponentInterface): void;
  attachChildComponents(components: ChildComponents): void;
  attachToDocument(root: HTMLElement, initData: ModelData): void;
}
