import { TrackProgress } from 'components/range-slider__track';

describe('TrackProgress', () => {
  let progress: TrackProgress;

  const color = 'rgb(133, 133, 133';
  const leftOffset = 25;
  const rightOffset = 75;

  beforeEach(() => {
    progress = new TrackProgress();
    progress.init();
    progress.render({ color, leftOffset, rightOffset });
  });

  test('to match snapshot', () => {
    expect(progress.nativeElement).toMatchSnapshot();
  });
});
