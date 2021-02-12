import { Track, Progress } from 'components/range-slider__track';
import { ProgressSegment } from '../range-slider__track.view';

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

describe('Progress', () => {
  let progress: Progress;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = 25;
  const rightOffset = 75;

  const props: ProgressProps = {
    color,
    segments: [
      {
        leftOffset,
        rightOffset,
      },
    ],
  };

  beforeEach(() => {
    progress = new Progress();
    progress.init();
    progress.render(props);
  });

  test('to match snapshot', () => {
    expect(progress.nativeElement).toMatchSnapshot();
  });
});

describe('ProgressSegment', () => {
  let progressSegment: ProgressSegment;

  const color = 'rgb(133, 133, 133)';
  const leftOffset = 25;
  const rightOffset = 75;

  const props: ProgressSegmentProps = {
    color,
    leftOffset,
    rightOffset,
  };

  beforeEach(() => {
    progressSegment = new ProgressSegment();
    progressSegment.init();
    progressSegment.render(props);
  });

  test('updateColor()', () => {
    expect(progressSegment.nativeElement.style.getPropertyValue('background-color')).toEqual(color);

    const newColor = 'rgb(255, 255, 255)';
    expect(newColor).not.toEqual(color);

    progressSegment.updateColor(newColor);
    expect(progressSegment.nativeElement.style.getPropertyValue('background-color')).toEqual(
      newColor,
    );
  });

  test('updateLeftOffset()', () => {
    let receivedOffset = parseFloat(progressSegment.nativeElement.style.getPropertyValue('left'));
    expect(receivedOffset).toEqual(leftOffset);

    const newOffset = 30;
    expect(newOffset).not.toEqual(leftOffset);

    progressSegment.updateLeftOffset(newOffset);
    receivedOffset = parseFloat(progressSegment.nativeElement.style.getPropertyValue('left'));
    expect(receivedOffset).toEqual(newOffset);
  });

  test('updateRightOffset()', () => {
    let receivedOffset = parseFloat(progressSegment.nativeElement.style.getPropertyValue('right'));
    expect(receivedOffset).toEqual(100 - rightOffset);

    const newOffset = 80;
    expect(newOffset).not.toEqual(rightOffset);

    progressSegment.updateRightOffset(newOffset);

    receivedOffset = parseFloat(progressSegment.nativeElement.style.getPropertyValue('right'));
    expect(receivedOffset).toEqual(100 - newOffset);
  });

  test('to match snapshot', () => {
    expect(progressSegment.nativeElement).toMatchSnapshot();
  });
});
