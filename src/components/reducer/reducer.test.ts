import {
  actionNames,
  rangeSliderStoreReducer,
  IRangeSliderState,
} from './reducer';

describe('test reducer', () => {
  describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: 50, MAX: 100, STEP: 5)`, () => {
    const MIN = 50;
    const MAX = 100;
    const STEP = 5;
    const VALUE = [MIN, MAX];

    const INIT_STATE = {
      min: MIN,
      max: MAX,
      step: STEP,
      value: VALUE,
    } as IRangeSliderState;

    test('min <= value <= max', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 80,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(ACTION.value);
    });

    test('min >= value <= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 30,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MIN);
    });

    test('min <= value >= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 110,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MAX);
    });
  });

  describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: -50, MAX: 0, STEP: 5)`, () => {
    const MIN = -50;
    const MAX = 0;
    const STEP = 5;
    const VALUE = [MIN, MAX];

    const INIT_STATE = {
      min: MIN,
      max: MAX,
      step: STEP,
      value: VALUE,
    } as IRangeSliderState;

    test('min <= value <= max', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: -20,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(ACTION.value);
    });

    test('min >= value <= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: -100,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MIN);
    });

    test('min <= value >= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 1,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MAX);
    });
  });

  describe(`${actionNames.CHANGE_LEFT_VALUE} (MIN: 0.5, MAX: 2.5, STEP: 0.1)`, () => {
    const MIN = 0.5;
    const MAX = 2.5;
    const STEP = 0.1;
    const VALUE = [MIN, MAX];

    const INIT_STATE = {
      min: MIN,
      max: MAX,
      step: STEP,
      value: VALUE,
    } as IRangeSliderState;

    test('min <= value <= max', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 1.5,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(ACTION.value);
    });

    test('min >= value <= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 0.2,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MIN);
    });

    test('min <= value >= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_LEFT_VALUE,
        value: 3.3,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[0]).toEqual(MAX);
    });
  });

  describe(`${actionNames.CHANGE_RIGHT_VALUE} (MIN: 50, MAX: 100, STEP: 5)`, () => {
    const MIN = 50;
    const MAX = 100;
    const STEP = 5;
    const VALUE = [MIN, MAX];

    const INIT_STATE = {
      min: MIN,
      max: MAX,
      step: STEP,
      value: VALUE,
    } as IRangeSliderState;

    test('min <= value <= max', () => {
      const ACTION = {
        name: actionNames.CHANGE_RIGHT_VALUE,
        value: 75,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[1]).toEqual(ACTION.value);
    });

    test('min >= value <= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_RIGHT_VALUE,
        value: 0,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[1]).toEqual(MIN);
    });

    test('min <= value >= max ', () => {
      const ACTION = {
        name: actionNames.CHANGE_RIGHT_VALUE,
        value: 110,
      };

      const NEXT_STATE = rangeSliderStoreReducer(ACTION, INIT_STATE);

      expect(NEXT_STATE.value[1]).toEqual(MAX);
    });
  });
});
