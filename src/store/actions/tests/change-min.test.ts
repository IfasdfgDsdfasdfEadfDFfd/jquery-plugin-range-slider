import { CHANGE_MIN, getMin } from '../change-min';

describe(`${CHANGE_MIN} MAX: 100, STEP: 1`, () => {
  const MAX = 100;
  const STEP = 1;

  test('min < max', () => {
    const MIN = 0;
    const result = getMin(MIN, MAX, STEP);

    expect(result).toEqual(MIN);
  });

  test('min > max', () => {
    const MIN = 101;
    const result = getMin(MIN, MAX, STEP);

    expect(result).toEqual(MAX);
  });

  test('min = max', () => {
    const MIN = 100;
    const result = getMin(MIN, MAX, STEP);

    expect(result).toEqual(MAX);
    expect(result).toEqual(MIN);
  });

  test('min:float < max', () => {
    const MIN = 0.1;
    const result = getMin(MIN, MAX, STEP);

    expect(result).toEqual(STEP);
  });
});
