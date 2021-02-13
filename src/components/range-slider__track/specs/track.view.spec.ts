import { Track } from 'components/range-slider__track';

describe('Track', () => {
  let track: Track;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = 25;
  const rightOffset = 75;

  const props: TrackProps = {
    color,
    ratio: 0,
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
    scaleItems: [
      {
        offset: 25,
        buttonText: 'button text',
      },
      {
        offset: 55,
        buttonText: 'button text',
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
