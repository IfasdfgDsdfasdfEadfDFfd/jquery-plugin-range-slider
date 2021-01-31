type ChildComponents = ComponentInterface[];

interface ComponentInterface {
  view: ViewInterface;
  model: ModelInterface;
  controller: ControllerInterface;

  attachChildComponents(components: ChildComponents): void;
}
