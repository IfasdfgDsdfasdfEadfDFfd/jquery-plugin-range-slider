import { Controller } from '@core';

class TrackController extends Controller {
  mapState({ common, track }: RangeSliderModelData): Partial<TrackProps> {
    return {
      progressProps: {
        color: common.color,
        leftOffset: track.leftOffset,
        rightOffset: track.rightOffset,
      },
    };
  }
}

export { TrackController };
