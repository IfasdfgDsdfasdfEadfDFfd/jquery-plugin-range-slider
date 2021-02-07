interface InputModelData extends ModelData {
  min: number;
  max: number;
  values: number[];
}

interface InputProps extends ViewProps {
  itemProps: InputItemProps;
}

interface InputItemProps extends ViewProps {
  elementProps: InputItemElementProps;
  thumbProps: InputItemThumbProps;
}

interface InputItemElementProps extends ViewProps {
  min: number;
  max: number;
  value: number;
  valueChangeHandler: EventListener;
}
