interface InputModelData extends ModelData {
  min: number;
  max: number;
  values: number[];
}

interface InputProps extends ViewProps {
  itemProps: InputItemProps;
  color: string;
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

interface InputItemThumbProps extends ViewProps {
  markerText: string;
  color: string;
}

interface InputItemThumbMarkerProps extends ViewProps {
  text: string;
  color: string;
}
