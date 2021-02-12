type TrackModelData = ModelData;

interface TrackProps extends ViewProps {
  color: string;
  progressSegments: ProgressProps['segments'];
  thumbItems: ThumbProps['thumbs'];
}

interface ProgressProps extends ViewProps {
  color: string;
  segments: Array<{
    leftOffset: number;
    rightOffset: number;
  }>;
}

interface ProgressSegmentProps extends ViewProps {
  color: string;
  leftOffset: number;
  rightOffset: number;
}

interface ThumbProps extends ViewProps {
  thumbs: Array<{
    positionOffset: number;
    markerText: string;
  }>;
  color: string;
}

interface ThumbItemProps extends ViewProps {
  positionOffset: number;
  markerText: string;
  color: string;
}

interface ThumbItemMarkerProps extends ViewProps {
  text: string;
  color: string;
}

interface ScaleModelData extends ModelData {
  values: string[];
}

interface ScaleProps extends ViewProps {
  items: string[];
}

interface ScaleItemProps extends ViewProps {
  buttonText: string;
}

interface ScaleItemButtonProps extends ViewProps {
  text: string;
}
