class Controller implements ControllerInterface {
  mapState(_state: ModelData): ViewProps {
    return {};
  }

  mapDispatch(_dispatch: Record<string, ModelDispatch>): ViewProps {
    return {};
  }
}

export { Controller };
