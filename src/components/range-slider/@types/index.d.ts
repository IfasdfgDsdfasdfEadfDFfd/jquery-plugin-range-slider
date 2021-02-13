interface RootModelData extends ModelData {
  color: string;
  ratio: number;
}

interface RangeSliderModelData extends Record<string, ModelData> {
  root: RootModelData;
  input: InputModelData;
  track: TrackModelData;
}

interface RangeSliderProps extends ViewProps {
  windowResizeHandler: EventListener;
}
