import { Controller } from '@core';

class TrackController extends Controller {
  mapState({ root, track }: RangeSliderModelData): Partial<TrackProps> {
    return {
      color: root.color,
      bars: track.bars,
    };
  }
}

export { TrackController };
