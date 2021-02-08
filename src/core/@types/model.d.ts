type ChildModel = ModelInterface;
type ModelData = Record<string, unknown>;
type ModelLinkedModels = Record<string, ChildModel>;
type ModelAction<TActionPayload> = {
  type: string;
  payload: TActionPayload;
};
type ModelDispatch = (action: ModelAction) => void;
type ModelListener = (data: ModelData) => void;
type ModelReducerCase<TData, TPayload> = (data: TData, payload: TPayload) => TData;

interface ModelInterface {
  name: string;
  data: ModelData;
  listeners: ModelListener[];
  linkedModels: ModelLinkedModels;
  reducerCases: Record<string, ModelReducer>;

  init(initData: ModelData): void;
  aggregateData(): ModelData;
  linkModel(model: ChildModel): void;
  dispatch: ModelDispatch;
  reducer(data: ModelData, action: ModelAction<unknown>): ModelData;
  subscribe(listener: ModelListener): void;
  coldStart(): void;
}
