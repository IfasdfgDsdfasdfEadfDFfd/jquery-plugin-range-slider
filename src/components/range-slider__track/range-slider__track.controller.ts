import { Controller } from '@core';

class TrackController extends Controller {
  mapState(data: RangeSliderModelData): Partial<TrackProps> {
    return {
      color: data.common.color,
      bars: data.track.bars,
    };
  }
}

export { TrackController };
