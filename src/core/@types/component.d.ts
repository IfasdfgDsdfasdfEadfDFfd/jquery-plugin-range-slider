type ChildComponents = ComponentInterface[];

interface ComponentInterface {
  view: ViewInterface;
  model: ModelInterface;
  controller: ControllerInterface;

  childComponents: ComponentInterface[];

  init(): void;
  addSubscriber(component: ComponentInterface): void;
  attachChildComponents(components: ChildComponents): void;
  attachToDocument(root: HTMLElement): void;
}
