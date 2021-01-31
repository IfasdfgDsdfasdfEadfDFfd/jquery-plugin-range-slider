class Model implements ModelInterface {
  name = this.constructor.name.toLowerCase();
  data: ModelData = {};
  linkedModels: ModelLinkedModels = {};
  listeners: ModelListener[] = [];

  getData(): ModelData {
    const linkedData = Object.entries(this.linkedModels).reduce((data, [name, model]) => {
      return { ...data, [name]: model.getData() };
    }, {});

    return {
      ...this.data,
      ...linkedData,
    };
  }

  reducer(data: ModelData, _action: ModelAction<unknown>): ModelData {
    return data;
  }

  link(model: ModelInterface): void {
    this.linkedModels[model.name] = model;
  }

  dispatch(action: ModelAction<unknown>): void {
    this.data = this.reducer(this.data, action);
    this.listeners.forEach(listener => listener(this.getData()));
  }

  subscribe(listener: ModelListener): void {
    this.listeners.push(listener);
  }
}

export { Model };
