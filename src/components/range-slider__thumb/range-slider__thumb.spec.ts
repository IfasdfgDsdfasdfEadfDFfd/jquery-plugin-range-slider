import { Thumb, ThumbMarker } from './range-slider__thumb.view';

describe('Thumb view', () => {
  let thumb: Thumb;

  beforeEach(() => {
    thumb = new Thumb();
    document.body.innerHTML = '';
  });

  test('setPrimaryColor()', () => {
    const blackColor = 'rgb(0, 0, 0)';
    expect(thumb.lastColor).toBeUndefined();

    thumb.setPrimaryColor(blackColor);
    expect(thumb.lastColor).toEqual(blackColor);
    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(blackColor);
  });

  test('calcOffset()', () => {
    const min = 0;
    const max = 10;
    const value = 5;

    expect(thumb.calcOffset({ min, max, value })).not.toBeNaN();
  });

  test('setOffset()', () => {
    const min = 0;
    const max = 10;
    const value = 5;

    expect(thumb.nativeElement.style.getPropertyValue('left')).toEqual('');
    thumb.setOffset({ min, max, value });
    expect(thumb.nativeElement.style.getPropertyValue('left')).not.toEqual('');
  });
});

describe('ThumbMarker view', () => {
  let marker: ThumbMarker;

  beforeEach(() => {
    marker = new ThumbMarker();
  });

  test('', () => {});
});
