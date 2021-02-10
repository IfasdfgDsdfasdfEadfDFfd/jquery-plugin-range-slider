import { makeValueMultipleBy } from 'core/utils';

describe('makeValueMultipleBy()', () => {
  test('value < multiple, value % multiple === 0', () => {
    const result = makeValueMultipleBy(0, 1);
    expect(result).toEqual(0);
  });

  test('value:float < multiple, value % multiple !== 0', () => {
    const result = makeValueMultipleBy(0.1, 1);
    expect(result).toEqual(1);
  });

  test('value > multiple, value % multiple === 0', () => {
    const result = makeValueMultipleBy(2, 1);
    expect(result).toEqual(2);
  });

  test('value:float > multiple:float, value % multiple === 0', () => {
    const result = makeValueMultipleBy(34.3, 0.7);
    expect(result).toEqual(34.3);
  });

  test('value:float > multiple:float, value % multiple === 0', () => {
    const result = makeValueMultipleBy(55.6, 0.4);
    expect(result).toEqual(55.6);
  });

  test('value > multiple:float, value % multiple !== 0', () => {
    const result = makeValueMultipleBy(15, 0.4);
    expect(result).toEqual(14.8);
  });

  test('value > multiple:float, value % multiple === 0', () => {
    const result = makeValueMultipleBy(10, 0.4);
    expect(result).toEqual(10);
  });

  test('value > multiple:float, value % multiple !== 0', () => {
    const result = makeValueMultipleBy(2, 0.4);
    expect(result).toEqual(2);
  });

  test('value:float > multiple, value % multiple !== 0', () => {
    const result = makeValueMultipleBy(15.7, 5);
    expect(result).toEqual(15);
  });
});
