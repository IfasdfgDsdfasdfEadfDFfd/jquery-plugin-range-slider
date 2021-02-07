interface ControllerInterface {
  mapState(state: ModelData): ViewProps;
  mapDispatch(dispatch: ModelDispatch): ViewProps;
}
