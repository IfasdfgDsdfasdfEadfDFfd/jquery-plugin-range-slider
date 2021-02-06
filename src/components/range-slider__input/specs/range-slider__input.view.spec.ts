import {
  Input,
  InputItem,
  InputItemElement,
  InputItemThumb,
  InputItemThumbMarker,
} from 'components/range-slider__input';

describe('Input', () => {
  let input: Input;

  const elementProps = {
    min: 0,
    max: 10,
    value: 5,
    valueChangeHandler: jest.fn(),
  };
  const thumbProps = {
    markerText: 'marker text',
    color: 'rgb(133, 133, 133)',
  };
  const itemProps = {
    elementProps,
    thumbProps,
  };

  beforeEach(() => {
    input = new Input();
    input.init();
    input.render({ itemProps });
  });

  test('to match snapshot', () => {
    expect(input.nativeElement).toMatchSnapshot();
  });
});

describe('InputItem', () => {
  let item: InputItem;

  const elementProps = {
    min: 0,
    max: 10,
    value: 5,
    valueChangeHandler: jest.fn(),
  };
  const thumbProps = {
    markerText: 'marker text',
    color: 'rgb(133, 133, 133)',
  };

  beforeEach(() => {
    item = new InputItem();
    item.init();
    item.render({ elementProps, thumbProps });
  });

  test('to match snapshot', () => {
    expect(item.nativeElement).toMatchSnapshot();
  });
});

describe('InputItemElement', () => {
  let element: InputItemElement;
  let valueChangeHandler: jest.Mock;

  const min = 0;
  const max = 10;
  const value = 5;

  beforeEach(() => {
    valueChangeHandler = jest.fn();
    element = new InputItemElement();
    element.init();
    element.render({ min, max, value, valueChangeHandler });
  });

  test('updateMin()', () => {
    expect(element.nativeElement.getAttribute('min')).toEqual(min.toString());

    const newMin = 3;
    expect(newMin).not.toEqual(min);

    element.updateMin(newMin);
    expect(element.nativeElement.getAttribute('min')).toEqual(newMin.toString());
  });

  test('updateMax()', () => {
    expect(element.nativeElement.getAttribute('max')).toEqual(max.toString());

    const newMax = 13;
    expect(newMax).not.toEqual(max);

    element.updateMax(newMax);
    expect(element.nativeElement.getAttribute('max')).toEqual(newMax.toString());
  });

  test('updateValue()', () => {
    expect(element.nativeElement.getAttribute('value')).toEqual(value.toString());

    const newValue = 8;
    expect(newValue).not.toEqual(value);

    element.updateValue(newValue);
    expect(element.nativeElement.getAttribute('value')).toEqual(newValue.toString());
  });

  test('to match snapshot', () => {
    expect(element.nativeElement).toMatchSnapshot();
  });
});

describe('InputItemThumb', () => {
  let thumb: InputItemThumb;

  const markerText = 'marker text';
  const color = 'rgb(133, 133, 133)';

  beforeEach(() => {
    thumb = new InputItemThumb();
    thumb.init();
    thumb.render({ markerText, color });
  });

  test('updateColor()', () => {
    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(color);

    const newColor = 'rgb(255, 255, 255)';
    expect(newColor).not.toEqual(color);

    thumb.updateColor(newColor);
    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(thumb.nativeElement).toMatchSnapshot();
  });
});

describe('InputItemThumbMarker', () => {
  let marker: InputItemThumbMarker;

  const text = 'marker text';
  const color = 'rgb(133, 133, 133)';

  beforeEach(() => {
    marker = new InputItemThumbMarker();
    marker.init();
    marker.render({ text, color });
  });

  test('updateText()', () => {
    expect(marker.nativeElement.textContent).toEqual(text);

    const newText = 'new marker text';
    expect(newText).not.toEqual(text);

    marker.updateText(newText);
    expect(marker.nativeElement.textContent).toEqual(newText);
  });

  test('updateColor()', () => {
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(color);

    const newColor = 'rgb(255, 255, 255)';
    expect(newColor).not.toEqual(color);

    marker.updateColor(newColor);
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(marker.nativeElement).toMatchSnapshot();
  });
});
