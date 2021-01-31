interface TrackModelData extends ModelData {
  scaleValues: string[];
}

interface TrackProps extends ViewProps {
  progressProps: TrackProgressProps;
  scaleProps: TrackScaleProps;
}

interface TrackProgressProps extends ViewProps {
  leftOffset: number;
  rightOffset: number;
}

interface TrackScaleProps extends ViewProps {
  values: string[];
}

interface TrackScaleItemProps extends ViewProps {
  buttonText: string;
}

interface TrackScaleItemButtonProps extends ViewProps {
  text: string;
}
