import { Component } from '@core';
import { TrackController } from './range-slider__track.controller';
import { TrackModel } from './range-slider__track.model';
import { Track } from './range-slider__track.view';

class TrackComponent extends Component {
  view = new Track();
  model = new TrackModel();
  controller = new TrackController();
}

export { TrackComponent };
