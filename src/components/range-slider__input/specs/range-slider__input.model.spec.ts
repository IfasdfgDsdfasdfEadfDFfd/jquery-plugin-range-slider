import { changeInputValue, changeMax, changeMin, changeStep } from '../range-slider__input.model';

describe('InputModel', () => {
  const originalData: InputModelData = {
    min: 1,
    max: 10,
    step: 1,
    values: [1, 2, 3, 4, 5],
  };

  describe('changeInputValue', () => {
    test('do not change original value', () => {
      const index = 0;
      const value = originalData.min + originalData.step;

      const nextData = changeInputValue(originalData, { index, value });
      expect(nextData).not.toEqual(originalData);
    });

    test('do not affect any properties except values', () => {
      const nextData = changeInputValue(originalData, {
        index: 0,
        value: originalData.min + originalData.step,
      });
      const { values: originalValues, ...restOriginalProps } = originalData;
      const { values, ...restProps } = nextData;

      expect(restProps).toEqual(restOriginalProps);
      expect(values).not.toEqual(originalValues);
    });

    test('change value by index', () => {
      const index = 0;
      const value = originalData.values[index] + originalData.step;

      const nextData = changeInputValue(originalData, { index, value });
      expect(nextData.values[index]).toEqual(value);
    });

    test('values list should be ascending', () => {
      const index = originalData.values.length - 1;
      const value = originalData.min;

      const nextData = changeInputValue(originalData, { index, value });
      nextData.values.forEach(resultValue => {
        expect(resultValue).toBeLessThanOrEqual(value);
      });
    });

    test('next value should not be less than min value', () => {
      const index = 0;
      const value = originalData.min - 1;

      const nextData = changeInputValue(originalData, { index, value });
      expect(nextData.values[index]).toEqual(originalData.min);
    });
  });

  describe('changeMin', () => {
    test('do not change originalData', () => {
      const min = 5;

      const nextData = changeMin(originalData, min);
      expect(nextData).not.toEqual(originalData);
    });

    test('change min value', () => {
      const min = 5;

      const nextData = changeMin(originalData, min);
      expect(nextData.min).toEqual(min);
    });

    test('min value should not be greater than max value', () => {
      const min = originalData.max + 1;

      const nextData = changeMin(originalData, min);
      expect(nextData.max).toEqual(originalData.max);
      expect(nextData.min).toEqual(originalData.max);
    });

    test('min value may be less than prev min value', () => {
      const min = originalData.min - 1;

      const nextData = changeMin(originalData, min);
      expect(nextData.min).toEqual(min);
    });

    test('check all values to be greater or equal min value', () => {
      const min = originalData.min + 5;

      const nextData = changeMin(originalData, min);
      nextData.values.forEach(value => {
        expect(value).toBeGreaterThanOrEqual(min);
      });
    });
  });

  describe('changeMax', () => {
    test('do not change originalData', () => {
      const max = 15;

      const nextData = changeMax(originalData, max);
      expect(nextData).not.toEqual(originalData);
    });

    test('change max value', () => {
      const max = 15;

      const nextData = changeMax(originalData, max);
      expect(nextData.max).toEqual(max);
    });

    test('max value should not be less than min value', () => {
      const max = originalData.min - 1;

      const nextData = changeMax(originalData, max);
      expect(nextData.min).toEqual(originalData.min);
      expect(nextData.max).toEqual(originalData.min);
    });

    test('max value may be greater than prev max value', () => {
      const max = originalData.max + 1;

      const nextData = changeMax(originalData, max);
      expect(nextData.max).toEqual(max);
    });

    test('check all values to be less or equal max value', () => {
      const max = originalData.min + 1;

      const nextData = changeMax(originalData, max);
      nextData.values.forEach(value => {
        expect(value).toBeLessThanOrEqual(max);
      });
    });
  });

  describe('changeStep', () => {
    test('do not change original data', () => {
      const nextData = changeStep(originalData, originalData.step + 1);
      expect(nextData).not.toEqual(originalData);
    });

    test('change step prop', () => {
      const step = originalData.step + 1;
      const nextData = changeStep(originalData, step);
      expect(nextData.step).toEqual(step);
    });

    test('min & max props must be multiples of a step', () => {
      const step = 6;
      expect(originalData.max % step).not.toEqual(0);
      expect(originalData.min % step).not.toEqual(0);

      const nextData = changeStep(originalData, step);

      expect(nextData.max % step).toEqual(0);
      expect(nextData.min % step).toEqual(0);
    });
  });
});
