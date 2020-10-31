import { getSliderValues } from './range-slider__track.view';

describe('range-slider__track', () => {
  describe('getSliderValues', () => {
    test('MAX: 10, MIN: 0, STEP: 0.4', () => {
      const MAX = 10;
      const MIN = 0;
      const STEP = 0.4;

      const result = getSliderValues(MIN, MAX, STEP);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
