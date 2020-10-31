import { actionNames, getValue } from './';

describe(actionNames.CHANGE_LEFT_VALUE, () => {
  describe('(MIN: 50, MAX: 100, RIGHT: 75, STEP: 5)', () => {
    const MIN = 50;
    const MAX = 100;
    const RIGHT = 75;
    const STEP = 5;

    test('min < value < right < max', () => {
      const VALUE = 80;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(VALUE);
    });

    test('min > value < right < max ', () => {
      const VALUE = 30;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MIN);
    });

    test('min < value > max > right', () => {
      const VALUE = 110;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MAX);
    });
  });

  describe('(MIN: -50, MAX: 0, RIGHT: -40, STEP: 5)', () => {
    const MIN = -50;
    const MAX = 0;
    const RIGHT = -10;
    const STEP = 5;

    test('min < value < right < max', () => {
      const VALUE = -20;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(VALUE);
    });

    test('min > value < right < max ', () => {
      const VALUE = -100;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MIN);
    });

    test('min < value > max > right', () => {
      const VALUE = 1;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MAX);
    });
  });

  describe('(MIN: 0.5, MAX: 2.5, RIGHT: 2.0, STEP: 0.1)', () => {
    const MIN = 0.5;
    const MAX = 2.5;
    const RIGHT = 2.0;
    const STEP = 0.1;

    test('min < value < right < max', () => {
      const VALUE = 1.5;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(VALUE);
    });

    test('min > value < right < max ', () => {
      const VALUE = 0.2;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MIN);
    });

    test('min < value > max > right', () => {
      const VALUE = 3.3;
      const NEXT_VALUE = getValue(VALUE, RIGHT, MIN, MAX, STEP);
      expect(NEXT_VALUE[0]).toEqual(MAX);
    });
  });
});

describe(actionNames.CHANGE_RIGHT_VALUE, () => {
  describe('(MIN: 50, MAX: 100, LEFT: 60, STEP: 5)', () => {
    const MIN = 50;
    const MAX = 100;
    const LEFT = 60;
    const STEP = 5;

    test('min < left < value < max', () => {
      const VALUE = 75;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(VALUE);
    });

    test('min > left > value < max ', () => {
      const VALUE = 0;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MIN);
    });

    test('left < min < value > max', () => {
      const VALUE = 110;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MAX);
    });
  });

  describe('(MIN: -50, MAX: 0, LEFT: -40, STEP: 5)', () => {
    const MIN = -50;
    const MAX = 0;
    const LEFT = -40;
    const STEP = 5;

    test('min < left < value < max', () => {
      const VALUE = -10;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(VALUE);
    });

    test('min > left > value < max ', () => {
      const VALUE = -55;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MIN);
    });

    test('left < min < value > max', () => {
      const VALUE = 1;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MAX);
    });
  });

  describe('(MIN: 0.5, MAX: 2.5, LEFT: 1.2, STEP: 0.1)', () => {
    const MIN = 0.5;
    const MAX = 2.5;
    const LEFT = 1.2;
    const STEP = 0.1;

    test('min < left < value < max', () => {
      const VALUE = 1.5;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(VALUE);
    });

    test('min > left > value < max ', () => {
      const VALUE = 0.3;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MIN);
    });

    test('left < min < value > max', () => {
      const VALUE = 4.5;
      const NEXT_VALUE = getValue(LEFT, VALUE, MIN, MAX, STEP);
      expect(NEXT_VALUE[1]).toEqual(MAX);
    });
  });
});
