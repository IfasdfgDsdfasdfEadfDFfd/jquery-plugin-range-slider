import { TrackController } from '../range-slider__track.controller';

describe('TrackController', () => {
  let track: TrackController;

  const min = 0;
  const max = 10;
  const values = [4, 5, 6];

  beforeEach(() => {
    track = new TrackController();
  });

  test('calcOffset()', () => {
    const offset = track.calcOffset({ min, max, value: values[1] });
    expect(offset).toEqual(50);
  });

  test('calcOffsets()', () => {
    const offsets = track.calcOffsets({ min, max, values });
    offsets.forEach((offset, index) => {
      expect(offset).toEqual(values[index] * 10);
    });
  });

  test('createOffsetPairs() with one offset', () => {
    const offsets = [50];
    const pairs = track.createOffsetPairs(offsets);

    expect(pairs).toHaveLength(1);
    expect(pairs[0].right).toEqual(offsets[0]);
  });

  test('createOffsetPairs() with multiple offsets', () => {
    const offsets = [30, 40, 50, 60, 70];
    const pairs = track.createOffsetPairs(offsets);

    expect(pairs).toHaveLength(offsets.length - 1);
  });
});
