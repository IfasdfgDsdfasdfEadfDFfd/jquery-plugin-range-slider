import { Track, Progress } from 'components/range-slider__track';
import { ProgressSegment, ThumbItem, ThumbItemMarker } from '../range-slider__track.view';

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

describe('ThumbItem', () => {
  let thumbItem: ThumbItem;
  const props: ThumbItemProps = {
    color: 'rgb(255, 255, 255)',
    markerText: 'marker text',
    positionOffset: 0,
  };

  beforeEach(() => {
    thumbItem = new ThumbItem();
    thumbItem.init();
    thumbItem.render(props);
  });

  test('updatePosition()', () => {
    const newPositionOffset = 10;

    thumbItem.updatePosition(newPositionOffset);
    const elementOffset = parseFloat(thumbItem.nativeElement.style.getPropertyValue('left'));
    expect(elementOffset).toEqual(newPositionOffset);
  });
  test('updateColor()', () => {
    const newColor = 'rgb(133, 133, 133)';
    expect(newColor).not.toEqual(props.color);

    thumbItem.updateColor(newColor);
    expect(thumbItem.nativeElement.style.getPropertyValue('background-color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(thumbItem.nativeElement).toMatchSnapshot();
  });
});

describe('ThumbItemMarker', () => {
  let marker: ThumbItemMarker;

  const props: ThumbItemMarkerProps = {
    color: 'rgb(255, 255, 255)',
    text: 'marker text',
  };

  beforeEach(() => {
    marker = new ThumbItemMarker();
    marker.init();
    marker.render(props);
  });

  test('updateText()', () => {
    const newText = 'new marker text';

    expect(newText).not.toEqual(props.text);
    marker.updateText(newText);
    expect(marker.nativeElement.textContent).toEqual(newText);
  });

  test('updateColor()', () => {
    const newColor = 'rgb(133, 133, 133)';

    expect(newColor).not.toEqual(props.color);
    marker.updateColor(newColor);
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(marker.nativeElement).toMatchSnapshot();
  });
});
