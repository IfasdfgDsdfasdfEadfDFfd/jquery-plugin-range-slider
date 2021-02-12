import { Scale, ScaleItem, ScaleItemButton } from 'components/range-slider__track';

describe('Scale', () => {
  let scale: Scale;
  const items = ['first', 'second', 'third'];

  beforeEach(() => {
    scale = new Scale();
    scale.init();
    scale.render({ items });
  });

  test('updateItems()', () => {
    expect(Object.keys(scale.children).length).toEqual(items.length);

    const newItems = ['alpha', 'beta', 'delta', 'gamma'];
    expect(newItems.length).not.toEqual(items.length);

    scale.updateItems(newItems);
    expect(Object.keys(scale.children).length).toEqual(newItems.length);

    for (const [index, child] of Object.entries(scale.children)) {
      expect(child.nativeElement.innerHTML.includes(newItems[+index])).toBeTruthy;
    }
  });

  test('to match snapshot', () => {
    expect(scale.nativeElement).toMatchSnapshot();
  });
});

describe('ScaleItem', () => {
  let item: ScaleItem;
  const buttonText = 'button text';

  beforeEach(() => {
    item = new ScaleItem();
    item.init();
    item.render({ buttonText });
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
