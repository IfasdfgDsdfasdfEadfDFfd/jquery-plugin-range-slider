import { Track } from 'components/range-slider__track';

describe('Track', () => {
  let track: Track;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = 25;
  const rightOffset = 75;

  const props: TrackProps = {
    color,
    progressSegments: [
      {
        leftOffset,
        rightOffset,
      },
      {
        leftOffset,
        rightOffset,
      },
    ],
    thumbItems: [
      {
        positionOffset: leftOffset,
        markerText: 'marker text',
      },
      {
        positionOffset: leftOffset,
        markerText: 'marker text',
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
