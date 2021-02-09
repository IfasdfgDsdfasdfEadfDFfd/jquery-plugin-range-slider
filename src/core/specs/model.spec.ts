import { Model } from '@core';

describe('Model', () => {
  let model: Model<ModelData>;
  let childModel: Model<ModelData>;

  const rootData = {
    value: 'root value',
  };
  const childData = {
    value: 'child value',
  };

  const testAction = () => {
    return {
      type: 'action type',
      payload: 'action payload',
    };
  };

  beforeEach(() => {
    model = new Model();
    model.name = 'root';
    model.data = rootData;

    childModel = new Model();
    childModel.name = 'child';
    childModel.data = childData;
  });

  test('aggregateData() without linked models', () => {
    expect(model.aggregateData()).toEqual({ [model.name]: rootData });
  });

  test('aggregateData() with linked models', () => {
    model.linkModel(childModel);
    expect(model.aggregateData()).toEqual({ [model.name]: rootData, [childModel.name]: childData });
  });

  test('should subscribe listener', () => {
    const listener = jest.fn();

    model.subscribe(listener);
    expect(listener).not.toHaveBeenCalled();

    model.dispatch(testAction());

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ [model.name]: rootData });
  });
});
