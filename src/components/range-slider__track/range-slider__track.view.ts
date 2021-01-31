import { View } from '@core';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new TrackProgress(),
    scale: new TrackScale(),
  };
}

class TrackProgress extends View<TrackProgressProps> {
  attrs = {
    class: 'range-slider__track-progress',
  };
}

class TrackScale extends View<TrackScaleProps> {
  tag = 'ul';
  attrs = {
    class: 'range-slider__track-scale',
  };
}

class TrackScaleItem extends View<TrackScaleItemProps> {
  tag = 'li';
  attrs = {
    class: 'range-slider__track-scale__item',
  };
  children = {
    button: new TrackScaleItemButton(),
  };
}

class TrackScaleItemButton extends View<TrackScaleItemButtonProps> {
  tag = 'button';
  attrs = {
    type: 'button',
    class: 'range-slider__track-scale__item-button',
  };
  children = { text: '' };
}

export { Track, TrackProgress, TrackScale, TrackScaleItem, TrackScaleItemButton };
