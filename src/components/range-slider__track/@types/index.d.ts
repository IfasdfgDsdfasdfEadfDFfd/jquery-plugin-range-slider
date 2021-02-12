type TrackModelData = ModelData;

interface TrackProps extends ViewProps {
  color: string;
  progressSegments: ProgressProps['segments'];
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
