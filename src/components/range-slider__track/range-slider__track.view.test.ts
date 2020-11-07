import { defaultState } from '../reducer';
import { getSliderValues } from './range-slider__track.view';

describe('range-slider__track', () => {
  describe('getSliderValues', () => {
    test('MAX: 10, MIN: 0, STEP: 0.4', () => {
      const MAX = 10;
      const MIN = 0;
      const STEP = 0.4;

      const result = getSliderValues(
        Object.assign(defaultState, {
          min: MIN,
          max: MAX,
          step: STEP,
        }),
      );
      expect(result.length).toBeGreaterThan(0);
    });

    test('MAX: 4, MIN: -2.5, STEP: 0.1', () => {
      const MAX = 4;
      const MIN = -2.5;
      const STEP = 0.1;

      const getAccuracy = (value: number | string) =>
        (value.toString().split('.')[1] || '').length;

      const stepAccuracy = getAccuracy(STEP);

      const result = getSliderValues(
        Object.assign(defaultState, {
          min: MIN,
          max: MAX,
          step: STEP,
        }),
      );
      expect(result.length).toBeGreaterThan(0);
      result.forEach(value => {
        expect(getAccuracy(value.rawValue)).toBe(stepAccuracy);
      });
    });

    test('MAX: 100, MIN: 20, STEP: 5', () => {
      const MAX = 100;
      const MIN = 20;
      const STEP = 5;

      const result = getSliderValues(
        Object.assign(defaultState, {
          min: MIN,
          max: MAX,
          step: STEP,
        }),
      );
      expect(result.length).toBeGreaterThan(2);
    });

    test('MAX: 105, MIN: 20, STEP: 5', () => {
      const MAX = 105;
      const MIN = 20;
      const STEP = 5;

      const result = getSliderValues(
        Object.assign(defaultState, {
          min: MIN,
          max: MAX,
          step: STEP,
        }),
      );
      expect(result.length).toBeGreaterThan(2);
    });
  });
});
