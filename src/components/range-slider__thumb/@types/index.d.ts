type ThumbModelData = ModelData;

interface ThumbProps extends ViewProps {
  markerText: string;
  positionOffset: number;
  color: string;
}

interface ThumbMarkerProps extends ViewProps {
  text: string;
  color: string;
}
