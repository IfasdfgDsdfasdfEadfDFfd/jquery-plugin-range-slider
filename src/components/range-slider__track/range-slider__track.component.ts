import { Component } from '@core';

import { Track } from './range-slider__track.view';
import { TrackModel } from './range-slider__track.model';
import { TrackController } from './range-slider__track.controller';

class TrackComponent extends Component {
  view = new Track();
  model = new TrackModel();
  controller = new TrackController();
}

export { TrackComponent };
