import {
  RangeSliderThumb,
  RangeSliderThumbMarker,
} from './range-slider__thumb.view';


describe('range-slider__thumb', () => {
  describe('RangeSliderThumb', () => {
    let marker: RangeSliderThumbMarker;
    let thumb: RangeSliderThumb;

    beforeEach(() => {
      marker = new RangeSliderThumbMarker();
      thumb = new RangeSliderThumb(marker);
    });

    test('set position should change `left` css property of element', () => {
      const prev = thumb.element.style.left;
      thumb.position = {min: 0, max: 100, value: 50};
      const curr = thumb.element.style.left;

      expect(curr).not.toEqual(prev);
    });

    test('set hidden property should toggle class', () => {
      thumb.hidden = true;
      expect(thumb.element.classList).toContain(thumb.hidingElementClassName);

      thumb.hidden = false;
      expect(thumb.element.classList).not.toContain(thumb.hidingElementClassName);
    })
  });

  describe('RangeSliderThumbMarker', () => {
    let marker: RangeSliderThumbMarker;

    beforeEach(() => {
      marker = new RangeSliderThumbMarker();
    });

    test('set value should change `width, left` css property of element', () => {
    });

    test('set value should change `width, left` css property of element', () => {
    });

    test('set hidden property should toggle class', () => {
      marker.hidden = true;
      expect(marker.element.classList).toContain(marker.hidingElementClassName);

      marker.hidden = false;
      expect(marker.element.classList).not.toContain(marker.hidingElementClassName);
    })
  });
});
