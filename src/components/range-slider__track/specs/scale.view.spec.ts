import { Scale, ScaleItem, ScaleItemButton } from 'components/range-slider__track';

describe('Scale', () => {
  let scale: Scale;

  const color = 'rgb(255, 255, 255)';
  const items: ScaleProps['items'] = [
    {
      offset: 25,
      buttonText: 'first',
    },
    {
      offset: 45,
      buttonText: 'second',
    },
    {
      offset: 75,
      buttonText: 'third',
    },
  ];

  const props: ScaleProps = {
    color,
    items,
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

  const props = {
    color,
    offset,
    buttonText,
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

  const text = 'button text';

  beforeEach(() => {
    button = new ScaleItemButton();
    button.init();
    button.render({ text });
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
