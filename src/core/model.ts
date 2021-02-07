class Model implements ModelInterface {
  name = '';
  data: ModelData = {};
  linkedModels: ModelLinkedModels = {};
  listeners: ModelListener[] = [];

  aggregateData(): ModelData {
    const linkedData = Object.entries(this.linkedModels).reduce((data, [name, model]) => {
      return { ...data, [name]: model.aggregateData() };
    }, {});

    console.log(this.name, 'agg');
    return {
      ...this.data,
      ...linkedData,
    };
  }

  reducer(data: ModelData, _action: ModelAction<unknown>): ModelData {
    return data;
  }

  linkModel(model: ModelInterface): void {
    this.linkedModels[model.name] = model;
  }

  dispatch<T>(action: ModelAction<T>): void {
    this.data = this.reducer(this.data, action);
    const aggregatedData = this.aggregateData();
    this.listeners.forEach(listener => listener(aggregatedData));
  }

  subscribe(listener: ModelListener): void {
    this.listeners.push(listener);
  }

  coldStart(): void {
    this.dispatch(gigletAction());
  }
}

const gigletAction = (): ModelAction<null> => {
  return {
    type: '@GIGLET_ACTION',
    payload: null,
  };
};

export { Model };
