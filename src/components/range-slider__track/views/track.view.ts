import { View } from '@core';

import { Thumb, Progress, Scale } from 'components/range-slider__track/views';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new Progress(),
    thumb: new Thumb(),
    scale: new Scale(),
  };

  render({
    color,
    ratio,
    scaleItems: items,
    thumbItems: thumbs,
    progressSegments: segments,
  }: TrackProps): void {
    this.children.thumb.render({ color, thumbs });
    this.children.progress.render({ color, segments });
    this.children.scale.render({ color, items, ratio });
  }
}

export { Track };
