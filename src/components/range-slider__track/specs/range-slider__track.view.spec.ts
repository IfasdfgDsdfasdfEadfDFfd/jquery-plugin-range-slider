import { Track, TrackProgress } from 'components/range-slider__track';

describe('Track', () => {
  let track: Track;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = '25%';
  const rightOffset = '75%';

  const props = {
    color,
    bars: [
      {
        leftOffset,
        rightOffset,
      },
      {
        leftOffset,
        rightOffset,
      },
    ],
  };

  beforeEach(() => {
    track = new Track();
    track.init();
    track.render(props);
  });

  test('to match snapshot', () => {
    expect(track.nativeElement).toMatchSnapshot();
  });
});

describe('TrackProgress', () => {
  let progress: TrackProgress;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = '25%';
  const rightOffset = '75%';

  beforeEach(() => {
    progress = new TrackProgress();
    progress.init();
    progress.render({ color, leftOffset, rightOffset });
  });

  test('updateColor()', () => {
    expect(progress.nativeElement.style.getPropertyValue('background-color')).toEqual(color);

    const newColor = 'rgb(255, 255, 255)';
    expect(newColor).not.toEqual(color);

    progress.updateColor(newColor);
    expect(progress.nativeElement.style.getPropertyValue('background-color')).toEqual(newColor);
  });

  test('updateLeftOffset()', () => {
    expect(progress.nativeElement.style.getPropertyValue('left')).toEqual(leftOffset);

    const newOffset = '30%';
    expect(newOffset).not.toEqual(leftOffset);

    progress.updateLeftOffset(newOffset);
    expect(progress.nativeElement.style.getPropertyValue('left')).toEqual(newOffset);
  });

  test('updateRightOffset()', () => {
    expect(progress.nativeElement.style.getPropertyValue('right')).toEqual(rightOffset);

    const newOffset = '80%';
    expect(newOffset).not.toEqual(rightOffset);

    progress.updateRightOffset(newOffset);
    expect(progress.nativeElement.style.getPropertyValue('right')).toEqual(newOffset);
  });

  test('to match snapshot', () => {
    expect(progress.nativeElement).toMatchSnapshot();
  });
});
