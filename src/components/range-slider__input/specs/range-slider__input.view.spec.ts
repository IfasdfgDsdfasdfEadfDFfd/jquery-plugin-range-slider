import { Input, InputElement } from 'components/range-slider__input';

describe('Input', () => {
  let input: Input;

  const props = {
    min: 0,
    max: 10,
    values: [1, 2, 3, 4],
    valueChangeHandler: jest.fn(),
  };

  beforeEach(() => {
    input = new Input();
    input.init();
    input.render(props);
  });

  test('to match snapshot', () => {
    expect(input.nativeElement).toMatchSnapshot();
  });
});

describe('InputElement', () => {
  let inputElement: InputElement;

  const props = {
    min: 0,
    max: 10,
    value: 5,
    valueChangeHandler: jest.fn(),
  };

  beforeEach(() => {
    inputElement = new InputElement();
    inputElement.init();
    inputElement.render(props);
  });

  test('updateMin()', () => {
    const nextMin = 3;
    inputElement.updateMin(nextMin);
    expect(inputElement.nativeElement.getAttribute('min')).toEqual(nextMin.toString());
  });

  test('updateMax()', () => {
    const nextMax = 13;
    inputElement.updateMax(nextMax);
    expect(inputElement.nativeElement.getAttribute('max')).toEqual(nextMax.toString());
  });

  test('updateValue()', () => {
    const nextValue = 7;
    inputElement.updateValue(nextValue);
    expect(inputElement.nativeElement.getAttribute('value')).toEqual(nextValue.toString());
  });

  test('to match snapshot', () => {
    expect(inputElement.nativeElement).toMatchSnapshot();
  });
});
