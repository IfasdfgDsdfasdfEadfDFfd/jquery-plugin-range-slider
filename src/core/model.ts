class Model<TData extends ModelData> implements ModelInterface {
  name = '';
  data = {} as TData;
  linkedModels: ModelLinkedModels = {};
  listeners: ModelListener[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducerCases = {} as Record<string, ModelReducerCase<TData, any>>;

  init(initData: TData): void {
    this.data = initData;
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
  }

  dispatch(action: ModelAction<unknown>): void {
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
