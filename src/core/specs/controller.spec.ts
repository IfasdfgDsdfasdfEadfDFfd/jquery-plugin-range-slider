import { Controller, Model, View } from '@core';

describe('Controller', () => {
  let controller: ControllerInterface;
  let model: ModelInterface;
  let view: ViewInterface;

  const mapStateReturnValue = { a: 'string' };
  const mapDispatchReturnValue = { b: 'another string' };

  let viewRenderFn: jest.Mock;
  let mapStateFn: jest.Mock;
  let mapDispatchFn: jest.Mock;

  beforeEach(() => {
    model = new Model();
    view = new View();
    controller = new Controller();

    viewRenderFn = jest.fn();
    mapStateFn = jest.fn();
    mapStateFn.mockReturnValue(mapStateReturnValue);
    mapDispatchFn = jest.fn();
    mapDispatchFn.mockReturnValue(mapDispatchReturnValue);

    view.render = viewRenderFn;
    controller.mapState = mapStateFn;
    controller.mapDispatch = mapDispatchFn;
    controller.listen(model, view);
  });

  test('call mapping methods', () => {
    expect(mapStateFn).not.toHaveBeenCalled();
    expect(mapDispatchFn).not.toHaveBeenCalled();
    expect(viewRenderFn).not.toHaveBeenCalled();

    model.dispatch({ type: '', payload: '' });
    expect(mapStateFn).toHaveBeenCalled();
    expect(mapDispatchFn).toHaveBeenCalled();
    expect(viewRenderFn).toHaveBeenCalled();
    expect(viewRenderFn).toHaveBeenLastCalledWith({
      ...mapStateReturnValue,
      ...mapDispatchReturnValue,
    });
  });
});
