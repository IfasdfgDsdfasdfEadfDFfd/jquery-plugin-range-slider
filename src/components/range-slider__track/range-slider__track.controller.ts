import { Controller } from '@core';

class TrackController extends Controller {
  mapState({ common, track }: RangeSliderModelData): Partial<TrackProps> {
    return {
      color: common.color,
      bars: track.bars,
    };
  }
}

export { TrackController };
