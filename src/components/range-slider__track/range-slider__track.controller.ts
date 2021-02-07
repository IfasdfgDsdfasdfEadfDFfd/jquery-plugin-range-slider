import { Controller } from '@core';

class TrackController extends Controller {
  mapState(data: RangeSliderModelData): Partial<TrackProps> {
    console.log(data);
    return {
      color: data.common.color,
      bars: data.track.bars,
    };
  }
}

export { TrackController };
