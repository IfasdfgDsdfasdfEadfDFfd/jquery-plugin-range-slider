import {
  RangeSliderTrack,
  TrackScale,
  TrackScaleItem,
} from './range-slider__track.view';
import { createStore, NaNValidator } from '@core';
import { IRangeSliderState, rangeSliderStoreReducer } from '@store';

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

describe('RangeSliderTrack provider', () => {
  const store = createStore<IRangeSliderState>(
    {
      min: 0,
      max: 10,
      step: 1,
      value: [3, 5],
      prefix: () => '',
      postfix: () => '',
      vertical: false,
      intervalMode: true,
      markerVisibility: true,
      trackScaleVisibility: true,
      primaryColor: '#fff',
      fixedValues: [],
    },
    rangeSliderStoreReducer,
    [NaNValidator],
  );
  let rangeSliderTrack: RangeSliderTrack;

  beforeEach(() => {
    rangeSliderTrack = new RangeSliderTrack(store);
  });

  test('getDelimiter()', () => {
    // get lowest
    let delimiter = rangeSliderTrack.getDelimiter(100, [2, 5]);
    expect(delimiter).toEqual(2);

    // order sensity
    delimiter = rangeSliderTrack.getDelimiter(100, [5, 2]);
    expect(delimiter).toEqual(5);

    // nearest divisible
    delimiter = rangeSliderTrack.getDelimiter(11, [3, 5]);
    expect(delimiter).toEqual(5);
  });
});
