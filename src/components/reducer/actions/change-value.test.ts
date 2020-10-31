import { actionNames, getValue } from './';

describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: 50, MAX: 100, STEP: 5)`, () => {
  const MIN = 50;
  const MAX = 100;
  const STEP = 5;

  test('min < value < max', () => {
    const VALUE = 80;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(VALUE);
  });

  test('min > value < max ', () => {
    const VALUE = 30;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MIN);
  });

  test('min < value > max ', () => {
    const VALUE = 110;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MAX);
  });
});

describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: -50, MAX: 0, STEP: 5)`, () => {
  const MIN = -50;
  const MAX = 0;
  const STEP = 5;

  test('min < value < max', () => {
    const VALUE = -20;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(VALUE);
  });

  test('min > value < max ', () => {
    const VALUE = -100;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MIN);
  });

  test('min < value > max ', () => {
    const VALUE = 1;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MAX);
  });
});

describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: 0.5, MAX: 2.5, STEP: 0.1)`, () => {
  const MIN = 0.5;
  const MAX = 2.5;
  const STEP = 0.1;

  test('min < value < max', () => {
    const VALUE = 1.5;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(VALUE);
  });

  test('min > value < max ', () => {
    const VALUE = 0.2;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MIN);
  });

  test('min < value > max ', () => {
    const VALUE = 3.3;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[0]).toEqual(MAX);
  });
});

describe(`${actionNames.CHANGE_RIGHT_VALUE} (MIN: 50, MAX: 100, STEP: 5)`, () => {
  const MIN = 50;
  const MAX = 100;
  const STEP = 5;

  test('min < value < max', () => {
    const VALUE = 75;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[1]).toEqual(VALUE);
  });

  test('min > value < max ', () => {
    const VALUE = 0;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[1]).toEqual(MIN);
  });

  test('min < value > max ', () => {
    const VALUE = 110;
    const NEXT_VALUE = getValue(VALUE, MIN, MAX, STEP);
    expect(NEXT_VALUE[1]).toEqual(MAX);
  });
});
