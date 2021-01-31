import { TrackScaleItemButton } from '../range-slider__track.view';

describe('title', () => {
  describe('TrackScaleItemButton', () => {
    test('display button text', () => {
      const button = new TrackScaleItemButton();
      const text = 'button text';

      button.render({ text });
      expect(button.children.text).toEqual(text);
      expect(button.nativeElement.textContent).toEqual(text);
    });
  });
});
