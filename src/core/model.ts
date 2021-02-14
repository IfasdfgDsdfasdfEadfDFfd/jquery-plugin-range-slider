class Model<TData extends ModelData> implements ModelInterface {
  name = '';
  data = {} as TData;
  linkedModels: ModelLinkedModels = {};
  listeners: ModelListener[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducerCases = {} as Record<string, ModelReducerCase<TData, any>>;

  init(initData: Record<string, ModelData>): void {
    this.data = initData[this.name] as TData;
    Object.values(this.linkedModels).forEach(model => model.init(initData));
  }

  aggregateData(): ModelData {
    const linkedData = Object.values(this.linkedModels).reduce((data, model) => {
      return { ...data, ...model.aggregateData() };
    }, {});

    return {
      [this.name]: this.data,
      ...linkedData,
    };
  }

  reducer(data: TData, action: ModelAction<unknown>): TData {
    const reducerCase = this.reducerCases[action.type];
    return reducerCase ? reducerCase(data, action.payload) : data;
  }

  linkModel(model: ModelInterface): void {
    this.linkedModels[model.name] = model;
    model.subscribe(() => this.passDataToListeners());
  }

  dispatch(action: ModelAction<unknown>): void {
    this.data = this.reducer(this.data, action);
    this.passDataToListeners();
  }

  subscribe(listener: ModelListener): void {
    this.listeners.push(listener);
  }

  passDataToListeners(): void {
    const aggregatedData = this.aggregateData();
    this.listeners.forEach(listener => listener(aggregatedData));
  }
}

export { Model };
