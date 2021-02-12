import { View } from '@core';

import { Thumb, Progress } from 'components/range-slider__track/views';

class Track extends View<TrackProps> {
  attrs = {
    class: 'range-slider__track',
  };
  children = {
    progress: new Progress(),
    thumb: new Thumb(),
  };

  render({ color, progressSegments: segments, thumbItems: thumbs }: TrackProps): void {
    this.children.progress.render({ color, segments });
    this.children.thumb.render({ color, thumbs });
  }
}

export { Track };
