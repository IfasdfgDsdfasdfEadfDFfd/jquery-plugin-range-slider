import { ThumbMarker } from './range-slider__thumb.view';

describe('ThumbMarker view', () => {
  let marker: ThumbMarker;

  beforeEach(() => {
    marker = new ThumbMarker();
  });

  test('marker width', () => {
    expect(marker.width).toEqual(0);
    marker.text = 'text';
    expect(marker.width).toBeGreaterThan(0);
  });

  test('thumb marker margin-top in vertical orientation', () => {
    expect(marker.nativeElement.style.getPropertyValue('margin-top')).toEqual(
      '',
    );

    marker.vertical = true;

    expect(
      parseInt(marker.nativeElement.style.getPropertyValue('margin-top')),
    ).toEqual(-marker.minVerticalMargin);

    marker.text = 'text';

    expect(
      parseInt(marker.nativeElement.style.getPropertyValue('margin-top')),
    ).not.toEqual(-marker.minVerticalMargin);
  });
});
