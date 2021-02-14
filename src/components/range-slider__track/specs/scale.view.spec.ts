import { Scale, ScaleItem, ScaleItemButton } from 'components/range-slider__track';

describe('Scale', () => {
  let scale: Scale;

  const color = 'rgb(255, 255, 255)';
  const items: ScaleProps['items'] = [
    {
      offset: 25,
      rawValue: 0,
      buttonText: 'first',
    },
    {
      offset: 45,
      rawValue: 1,
      buttonText: 'second',
    },
    {
      offset: 75,
      rawValue: 2,
      buttonText: 'third',
    },
  ];

  const props: ScaleProps = {
    color,
    ratio: 0,
    items,
    buttonClickHandler: jest.fn(),
  };

  beforeEach(() => {
    scale = new Scale();
    scale.init();
    scale.render(props);
  });

  test('to match snapshot', () => {
    expect(scale.nativeElement).toMatchSnapshot();
  });
});

describe('ScaleItem', () => {
  let item: ScaleItem;

  const color = 'rgb(255, 255, 255)';
  const offset = 25;
  const buttonText = 'button text';

  const props: ScaleItemProps = {
    color,
    ratio: 0,
    offset,
    rawValue: 0,
    buttonText,
    buttonClickHandler: jest.fn(),
  };

  beforeEach(() => {
    item = new ScaleItem();
    item.init();
    item.render(props);
  });

  test('to match snapshot', () => {
    expect(item.nativeElement).toMatchSnapshot();
  });
});

describe('ScaleItemButton', () => {
  let button: ScaleItemButton;

  const value = 0;
  const text = 'button text';
  const clickHandler = jest.fn();

  const props: ScaleItemButtonProps = {
    value,
    text,
    clickHandler,
  };

  beforeEach(() => {
    button = new ScaleItemButton();
    button.init();
    button.render(props);
  });

  test('updateText()', () => {
    expect(button.nativeElement.textContent).toEqual(text);

    const newText = 'new button text';
    button.updateText(newText);

    expect(button.nativeElement.textContent).toEqual(newText);
  });

  test('to match snapshot', () => {
    expect(button.nativeElement).toMatchSnapshot();
  });
});
