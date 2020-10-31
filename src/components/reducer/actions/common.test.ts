import { makeValue } from './common';

describe('makeValue().', () => {
  describe('multipleBy()', () => {
    test('value < multiple, value % multiple === 0', () => {
      const result = makeValue(0).multipleBy(1);
      expect(result).toEqual(0);
    });

    test('value < multiple, value % multiple !== 0', () => {
      const result = makeValue(0.1).multipleBy(1);
      expect(result).toEqual(1);
    });

    test('value > multiple, value % multiple === 0', () => {
      const result = makeValue(2).multipleBy(1);
      expect(result).toEqual(2);
    });
  });
});
