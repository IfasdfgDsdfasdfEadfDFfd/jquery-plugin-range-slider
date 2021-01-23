import { TrackScale, TrackScaleItem } from './range-slider__track.view';

describe('TrackScaleItem view', () => {
  let trackScaleItem: TrackScaleItem;

  beforeEach(() => {
    trackScaleItem = new TrackScaleItem();
  });

  test('resetColor()', () => {
    const whiteColor = 'rgb(255, 255, 255)';

    expect(trackScaleItem.lastColor).toEqual('');
    trackScaleItem.color = whiteColor;
    expect(trackScaleItem.lastColor).toEqual(whiteColor);

    let color = trackScaleItem.nativeElement.style.getPropertyValue('color');
    expect(color).toEqual('');

    trackScaleItem.resetColor();
    color = trackScaleItem.nativeElement.style.getPropertyValue('color');
    expect(color).toEqual('');

    trackScaleItem.focused = true;
    trackScaleItem.resetColor();
    color = trackScaleItem.nativeElement.style.getPropertyValue('color');
    expect(color).toEqual(whiteColor);
  });
});

describe('TrackScale view', () => {
  let trackScale: TrackScale;
  beforeEach(() => {
    trackScale = new TrackScale();
  });

  test('createItem()', () => {
    const item = trackScale.createItem({
      value: '',
      ratio: 0,
      maxWidthInPixels: 1,
      offsetInPercentages: 0,
    });

    expect(item).toBeDefined();
  });
});

describe('RangeSliderTrack provider', () => {});
