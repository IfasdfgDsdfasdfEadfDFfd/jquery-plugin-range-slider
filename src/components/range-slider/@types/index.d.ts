interface RootModelData extends ModelData {
  color: string;
}

interface RangeSliderModelData extends Record<string, ModelData> {
  root: RootModelData;
  input: InputModelData;
  track: TrackModelData;
  scale: ScaleModelData;
}

interface RangeSliderProps extends ViewProps {
  windowResizeHandler: EventListener;
}
