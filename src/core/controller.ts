class Controller implements ControllerInterface {
  mapState(_state: ModelData): ViewProps {
    return {};
  }

  mapDispatch(_dispatch: ModelDispatch): ViewProps {
    return {};
  }

  listen(store: ModelInterface, view: ViewInterface): void {
    store.subscribe(data => {
      view.render({ ...this.mapState(data), ...this.mapDispatch(store.dispatch) });
    });
  }
}

export { Controller };
