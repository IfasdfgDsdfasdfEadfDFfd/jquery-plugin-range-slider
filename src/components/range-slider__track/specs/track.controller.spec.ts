import { TrackController } from 'components/range-slider__track';

describe('TrackController', () => {
  let track: TrackController;

  const min = 0;
  const max = 10;
  const values = [4, 5, 6];
  const offsetRatio = 0;

  beforeEach(() => {
    track = new TrackController();
  });

  test('calcOffset()', () => {
    const offset = track.calcOffset({ min, max, value: values[1], offsetRatio });
    expect(offset).toEqual(50);
  });

  test('calcOffsets()', () => {
    const offsets = track.calcOffsets({ min, max, values, offsetRatio });
    offsets.forEach((offset, index) => {
      expect(offset).toEqual(values[index] * 10);
    });
  });

  test('createProgressSegments() with one offset', () => {
    const offsets = [50];
    const pairs = track.createProgressSegments(offsets, 0);

    expect(pairs).toHaveLength(1);
    expect(pairs[0].rightOffset).toEqual(offsets[0]);
  });

  test('createProgressSegments() with multiple offsets', () => {
    const offsets = [30, 40, 50, 60, 70];
    const pairs = track.createProgressSegments(offsets, 0);

    expect(pairs).toHaveLength(offsets.length - 1);
  });
});
