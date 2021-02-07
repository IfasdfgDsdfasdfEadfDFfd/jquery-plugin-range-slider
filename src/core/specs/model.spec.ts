import { Model } from '@core';

describe('Model', () => {
  let model: Model;
  let childModel: Model;

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

  test('getData() without linked models', () => {
    expect(model.getData()).toEqual(rootData);
  });

  test('getData() with linked models', () => {
    model.linkModel(childModel);
    expect(model.getData()[childModel.name]).toEqual(childData);
  });
});
