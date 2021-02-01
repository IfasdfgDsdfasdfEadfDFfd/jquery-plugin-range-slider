import { TrackScaleItem, TrackScaleItemButton } from '../range-slider__track.view';

describe('Track Views', () => {
  // describe('TrackScale', () => {
  //   let scale: TrackScale;

  //   beforeEach(() => {

  //   });
  // });

  describe('TrackScaleItem', () => {
    let item: TrackScaleItem;
    const buttonText = 'button text';

    beforeEach(() => {
      item = new TrackScaleItem();
      item.init();
      item.render({ buttonText });
    });

    test('item snapshot', () => {
      expect(item.nativeElement.outerHTML).toMatchSnapshot();
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

    test('button snapshot', () => {
      expect(button.nativeElement.outerHTML).toMatchSnapshot();
    });
  });
});
