interface TrackModelData extends ModelData {
  bars: Array<{ leftOffset: string; rightOffset: string }>;
}

interface TrackProps extends ViewProps {
  color: string;
  bars: Array<{ leftOffset: string; rightOffset: string }>;
}

interface TrackProgressProps extends ViewProps {
  leftOffset: string;
  rightOffset: string;
  color: string;
}
