import { createStore, NaNValidator, Store } from '@core';
import {
  actionNames,
  IRangeSliderStoreState,
  rangeSliderStoreReducer,
} from '@store';
import { RangeSliderTrack, TrackScale } from './range-slider__track.view';

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
  let store: Store<IRangeSliderStoreState>;
  let rangeSliderTrack: RangeSliderTrack;

  beforeEach(() => {
    store = createStore<IRangeSliderStoreState>(
      {
        min: 0,
        max: 10,
        step: 1,
        value: [3, 5],
        prefix: () => '',
        postfix: () => '',
        vertical: false,
        intervalMode: false,
        markerVisibility: false,
        trackScaleVisibility: false,
        primaryColor: 'rgb(255, 255, 255)',
        fixedValues: [],
      },
      rangeSliderStoreReducer,
      [NaNValidator],
    );
    rangeSliderTrack = new RangeSliderTrack(store);
    store.coldStart();
  });

  test('track scale change visibility', () => {
    expect(rangeSliderTrack.elements.scale.visible).toBeFalsy();

    store.dispatch({
      name: actionNames.CHANGE_TRACK_SCALE_VISIBILITY,
      value: true,
    });

    expect(rangeSliderTrack.elements.scale.isVisible).toBeTruthy();
  });

  test('track scale change color', () => {
    const { primaryColor } = store.getState();

    let color = rangeSliderTrack.elements.scale.nativeElement.style.getPropertyValue(
      'color',
    );
    expect(color).toEqual(primaryColor);

    const blackColor = 'rgb(0, 0, 0)';

    store.dispatch({
      name: actionNames.CHANGE_PRIMARY_COLOR,
      value: blackColor,
    });

    color = rangeSliderTrack.elements.scale.nativeElement.style.getPropertyValue(
      'color',
    );
    expect(color).toEqual(blackColor);
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
