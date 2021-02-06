import { ScaleItemButton } from 'components/range-slider__scale';
import { ScaleItem } from '../range-slider__scale.view';

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

describe('ScaleItemButton view', () => {
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
