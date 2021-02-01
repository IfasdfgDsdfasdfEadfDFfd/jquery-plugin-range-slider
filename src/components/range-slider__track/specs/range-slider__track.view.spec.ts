import { TrackScaleItemButton } from '../range-slider__track.view';

describe('Track Views', () => {
  describe('TrackScaleItemButton', () => {
    let button: TrackScaleItemButton;
    const text = 'button text';

    beforeEach(() => {
      button = new TrackScaleItemButton();
      button.render({ text });
    });

    test('display button text', () => {
      expect(button.children.text).toEqual(text);
      expect(button.nativeElement.textContent).toEqual(text);
    });

    test('button snapshot', () => {
      expect(button.nativeElement.outerHTML).toMatchSnapshot();
    });
  });
});
