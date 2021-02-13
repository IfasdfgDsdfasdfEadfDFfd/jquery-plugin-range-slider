type TrackModelData = ModelData;

interface TrackProps extends ViewProps {
  color: string;
  ratio: number;
  progressSegments: ProgressProps['segments'];
  thumbItems: ThumbProps['thumbs'];
  scaleItems: ScaleProps['items'];
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
  color: string;
  ratio: number;
  items: Array<{
    offset: number;
    buttonText: string;
  }>;
}

interface ScaleItemProps extends ViewProps {
  color: string;
  offset: number;
  ratio: number;
  buttonText: string;
}

interface ScaleItemButtonProps extends ViewProps {
  text: string;
}
