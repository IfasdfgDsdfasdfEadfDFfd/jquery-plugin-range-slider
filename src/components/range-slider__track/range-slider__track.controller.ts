import { Controller } from '@core';

class TrackController extends Controller {
  mapState(state: TrackModelData): Partial<TrackProps> {
    return {
      scaleProps: { values: state.scaleValues },
      progressProps: { leftOffset: 25, rightOffset: 75 },
    };
  }
}

export { TrackController };
