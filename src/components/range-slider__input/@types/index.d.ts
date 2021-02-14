interface InputModelData extends ModelData {
  min: number;
  max: number;
  step: number;
  values: number[];
}

interface InputProps extends ViewProps {
  min: number;
  max: number;
  step: number;
  values: number[];
  valueChangeHandler: (index: number, value: number) => void;
}

interface InputElementProps extends ViewProps {
  min: number;
  max: number;
  step: number;
  value: number;
  index: number;
  valueChangeHandler: (index: number, value: number) => void;
}