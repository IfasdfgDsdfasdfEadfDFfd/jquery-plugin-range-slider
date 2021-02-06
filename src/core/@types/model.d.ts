type ChildModel = ModelInterface;
type ModelData = Record<string, unknown>;
type ModelLinkedModels = Record<string, ChildModel>;
type ModelAction<TActionPayload> = {
  type: string;
  payload: TActionPayload;
};
type ModelDispatch = (action: ModelAction<unknown>) => void;
type ModelListener = (state: ModelData) => void;

interface ModelInterface {
  name: string;
  data: ModelData;
  linkedModels: ModelLinkedModels;
  listeners: ModelListener[];
  getData(): ModelData;
  link(model: ChildModel): void;
  reducer(data: ModelData, action: ModelAction<unknown>): ModelData;
  dispatch: ModelDispatch;
  subscribe(listener: ModelListener): void;
  coldStart(): void;
}
