interface CommonModelData extends ModelData {
  color: string;
}

interface RangeSliderModelData extends ModelData {
  common: CommonModelData;
  input: InputModelData;
  scale: ScaleModelData;
}
