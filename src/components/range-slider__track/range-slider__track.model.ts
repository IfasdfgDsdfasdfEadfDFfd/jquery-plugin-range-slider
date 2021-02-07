import { Model } from '@core';

class TrackModel extends Model {
  name = 'track';

  data = {
    bars: [{ leftOffset: '25%', rightOffset: '75%' }],
  };
}

export { TrackModel };
