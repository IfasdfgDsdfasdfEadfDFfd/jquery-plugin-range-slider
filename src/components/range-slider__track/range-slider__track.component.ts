import { Component } from '@core';
import { ThumbComponent } from 'components/range-slider__thumb';

import { TrackController } from './range-slider__track.controller';
import { TrackModel } from './range-slider__track.model';
import { Track } from './range-slider__track.view';

class TrackComponent extends Component {
  view = new Track();
  model = new TrackModel();
  controller = new TrackController();

  childComponents = [new ThumbComponent()];
}

export { TrackComponent };
