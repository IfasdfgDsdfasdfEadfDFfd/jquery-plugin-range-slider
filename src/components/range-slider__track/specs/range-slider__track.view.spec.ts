import { TrackScale, TrackScaleItem, TrackScaleItemButton } from '../range-slider__track.view';

describe('Track Views', () => {
  describe('TrackScale', () => {
    let scale: TrackScale;
    const scaleValues = ['first', 'second', 'third'];

    beforeEach(() => {
      scale = new TrackScale();
      scale.init();
      scale.updateScaleItems(scaleValues);
    });

    test('update scale values', () => {
      expect(scale.nativeElement.children.length).toEqual(scaleValues.length);
    });

    test('scale snapshot matching', () => {
      expect(scale.nativeElement).toMatchSnapshot();
    });
  });

  describe('TrackScaleItem', () => {
    let item: TrackScaleItem;
    const buttonText = 'button text';

    beforeEach(() => {
      item = new TrackScaleItem();
      item.init();
      item.render({ buttonText });
    });

    test('item snapshot matching', () => {
      expect(item.nativeElement).toMatchSnapshot();
    });
  });

  describe('TrackScaleItemButton', () => {
    let button: TrackScaleItemButton;
    const text = 'button text';

    beforeEach(() => {
      button = new TrackScaleItemButton();
      button.init();
      button.render({ text });
    });

    test('update text content', () => {
      expect(button.nativeElement.textContent).toEqual(text);

      const newText = 'new text';
      expect(newText).not.toEqual(text);

      button.updateText(newText);
      expect(button.nativeElement.textContent).toEqual(newText);
    });

    test('button snapshot matching', () => {
      expect(button.nativeElement).toMatchSnapshot();
    });
  });
});
