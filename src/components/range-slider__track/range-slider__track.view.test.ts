import { IRangeSliderState } from '../reducer';
import { getSliderValues } from './range-slider__track.view';

describe('range-slider__track', () => {
  describe('getSliderValues', () => {
    test('MAX: 10, MIN: 0, STEP: 0.4', () => {
      const MAX = 10;
      const MIN = 0;
      const STEP = 0.4;
      const PREFIX = '';

      const result = getSliderValues({
        min: MIN,
        max: MAX,
        step: STEP,
        prefix: PREFIX,
      } as IRangeSliderState);
      expect(result.length).toBeGreaterThan(0);
    });

    test('MAX: 100, MIN: 20, STEP: 5', () => {
      const MAX = 100;
      const MIN = 20;
      const STEP = 5;

      const result = getSliderValues({
        min: MIN,
        max: MAX,
        step: STEP,
      } as IRangeSliderState);
      expect(result.length).toBeGreaterThan(2);
    });

    test('MAX: 105, MIN: 20, STEP: 5', () => {
      const MAX = 105;
      const MIN = 20;
      const STEP = 5;

      const result = getSliderValues({
        min: MIN,
        max: MAX,
        step: STEP,
      } as IRangeSliderState);
      expect(result.length).toBeGreaterThan(2);
    });
  });
});
