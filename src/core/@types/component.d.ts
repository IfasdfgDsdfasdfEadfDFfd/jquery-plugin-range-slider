type ChildComponents = ComponentInterface[];

interface ComponentInterface {
  view: ViewInterface;
  model: ModelInterface;
  controller: ControllerInterface;

  childComponents: ComponentInterface[];

  init(initData: ModelData, parentView?: ViewInterface): void;
  addSubscriber(component: ComponentInterface): void;
  attachToDocument(root: HTMLElement, initData: ModelData): void;
  coldStart(initData: Record<string, ModelData>): void;
}
