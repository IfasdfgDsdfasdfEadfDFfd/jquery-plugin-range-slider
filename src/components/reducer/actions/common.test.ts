import { makeValue } from './common';

describe('makeValue().', () => {
  describe('multipleBy()', () => {
    test('value < multiple, value % multiple === 0', () => {
      const result = makeValue(0).multipleBy(1);
      expect(result).toEqual(0);
    });

    test('value:float < multiple, value % multiple !== 0', () => {
      const result = makeValue(0.1).multipleBy(1);
      expect(result).toEqual(1);
    });

    test('value > multiple, value % multiple === 0', () => {
      const result = makeValue(2).multipleBy(1);
      expect(result).toEqual(2);
    });

    test('value:float > multiple:float, value % multiple === 0', () => {
      const result = makeValue(1.5).multipleBy(0.1);
      expect(result).toEqual(1.5);
    });

    test('value > multiple:float, value % multiple !== 0', () => {
      const result = makeValue(15).multipleBy(0.4);
      expect(result).toEqual(14.8);
    });

    test('value:float > multiple, value % multiple !== 0', () => {
      const result = makeValue(15.7).multipleBy(5);
      expect(result).toEqual(15);
    });
  });
});
