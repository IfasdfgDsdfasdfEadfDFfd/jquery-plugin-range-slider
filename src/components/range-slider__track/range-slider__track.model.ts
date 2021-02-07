import { Model } from '@core';

class TrackModel extends Model<TrackModelData> {
  name = 'track';

  data = {
    bars: [],
  };
}

export { TrackModel };
