import { CHANGE_MAX, getMax } from './change-max';

describe(`${CHANGE_MAX} MIN: 0, STEP: 1`, () => {
  const MIN = 0;
  const STEP = 1;

  test('max > min', () => {
    const MAX = 100;
    const result = getMax(MAX, MIN, STEP);

    expect(result).toEqual(MAX);
  });

  test('max < min', () => {
    const MAX = -1;
    const result = getMax(MAX, MIN, STEP);

    expect(result).toEqual(MIN);
  });

  test('max = min', () => {
    const MAX = 0;
    const result = getMax(MAX, MIN, STEP);

    expect(result).toEqual(MAX);
    expect(result).toEqual(MIN);
  });

  test('max:float > min, max % multiple !== 0', () => {
    const MAX = 10.3;
    const result = getMax(MAX, MIN, STEP);

    expect(result).toEqual(10);
  });
});
