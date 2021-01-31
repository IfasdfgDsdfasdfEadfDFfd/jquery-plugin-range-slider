class Controller implements ControllerInterface {
  mapState(_state: ModelData): ViewProps {
    return {};
  }

  mapDispatch(_dispatch: ModelDispatch): ViewProps {
    return {};
  }

  listen(model: ModelInterface, view: ViewInterface): void {
    model.subscribe(data => {
      view.render({ ...this.mapState(data), ...this.mapDispatch(model.dispatch) });
    });
  }
}

export { Controller };
