interface ControllerInterface {
  mapState(state: ModelData): ViewProps;
  mapDispatch(dispatch: Record<string, ModelDispatch>): ViewProps;
}
