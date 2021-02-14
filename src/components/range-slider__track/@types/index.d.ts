type TrackModelData = ModelData;

interface TrackProps extends ViewProps {
  color: string;
  ratio: number;
  progressSegments: ProgressProps['segments'];
  thumbItems: ThumbProps['thumbs'];
  scaleItems: ScaleProps['items'];
  scaleButtonClickHandler: (value: number) => void;
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
    rawValue: number;
    buttonText: string;
  }>;
  buttonClickHandler: (value: number) => void;
}

interface ScaleItemProps extends ViewProps {
  color: string;
  ratio: number;
  buttonText: string;
  offset: number;
  rawValue: number;
  buttonClickHandler: (value: number) => void;
}

interface ScaleItemButtonProps extends ViewProps {
  text: string;
  value: number;
  clickHandler: (value: number) => void;
}
