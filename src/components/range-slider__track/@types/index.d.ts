interface TrackProps extends ViewProps {
  progressProps: TrackProgressProps;
}

interface TrackProgressProps extends ViewProps {
  leftOffset: number;
  rightOffset: number;
  color: string;
}
