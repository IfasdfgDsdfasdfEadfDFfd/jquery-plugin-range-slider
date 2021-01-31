interface ControllerInterface {
  mapState(state: ModelData): ViewProps;
  mapDispatch(dispatch: ModelDispatch): ViewProps;

  listen(store: ModelInterface, view: ViewInterface): void;
}
