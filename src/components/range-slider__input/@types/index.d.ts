interface InputModelData extends ModelData {
  min: number;
  max: number;
  value: number;
}

interface InputProps extends ViewProps {
  data: InputModelData;
  valueChangeHandler: EventListener;
}

interface ThumbProps extends ViewProps {
  color: string;
  data: InputModelData;
}
