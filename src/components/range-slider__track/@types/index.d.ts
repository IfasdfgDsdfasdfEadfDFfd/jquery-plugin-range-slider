type TrackModelData = ModelData;

interface TrackProps extends ViewProps {
  color: string;
  offsetPairs: Array<{ left: number; right: number }>;
}

interface TrackProgressProps extends ViewProps {
  leftOffset: number;
  rightOffset: number;
  color: string;
}
