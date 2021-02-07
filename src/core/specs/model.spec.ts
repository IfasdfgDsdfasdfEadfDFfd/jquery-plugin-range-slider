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

  beforeEach(() => {
    model = new Model();
    model.name = 'root';
    model.data = rootData;

    childModel = new Model();
    childModel.name = 'child';
    childModel.data = childData;
  });

  test('aggregateData() without linked models', () => {
    expect(model.aggregateData()).toEqual({ root: rootData });
  });

  test('aggregateData() with linked models', () => {
    model.linkModel(childModel);
    expect(model.aggregateData()).toEqual({ root: rootData, child: childData });
  });
});
