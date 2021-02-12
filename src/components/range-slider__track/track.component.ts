import { Component } from '@core';

import { Track } from './views/track.view';
import { TrackModel } from './track.model';
import { TrackController } from './track.controller';

class TrackComponent extends Component {
  view = new Track();
  model = new TrackModel();
  controller = new TrackController();
}

export { TrackComponent };
