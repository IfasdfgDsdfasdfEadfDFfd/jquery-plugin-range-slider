import { Thumb, ThumbMarker } from './range-slider__thumb.view';

describe('Thumb view', () => {
  let thumb: Thumb;

  beforeEach(() => {
    thumb = new Thumb();
    document.body.innerHTML = '';
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

  test('setPrimaryColor()', () => {
    const blackColor = 'rgb(0, 0, 0)';
    expect(thumb.color).toEqual('');

    thumb.setPrimaryColor(blackColor);
    expect(thumb.color).toEqual(blackColor);
    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(blackColor);
  });

  test('chooseColors()', () => {
    const thumbInvertMock = jest.fn();
    const markerInvertMock = jest.fn();
    const thumbResetMock = jest.fn();
    const markerResetMock = jest.fn();

    thumb.invertColors = thumbInvertMock;
    thumb.resetColors = thumbResetMock;
    thumb.marker.invertColors = markerInvertMock;
    thumb.marker.resetColors = markerResetMock;

    expect(thumbInvertMock.mock.calls.length).toEqual(0);
    expect(thumbResetMock.mock.calls.length).toEqual(0);
    expect(markerInvertMock.mock.calls.length).toEqual(0);
    expect(markerResetMock.mock.calls.length).toEqual(0);

    thumb.chooseColors();

    expect(thumbInvertMock.mock.calls.length).toEqual(0);
    expect(thumbResetMock.mock.calls.length).toEqual(1);
    expect(markerInvertMock.mock.calls.length).toEqual(0);
    expect(markerResetMock.mock.calls.length).toEqual(1);

    thumb.hovered = true;

    expect(thumbInvertMock.mock.calls.length).toEqual(1);
    expect(thumbResetMock.mock.calls.length).toEqual(1);
    expect(markerInvertMock.mock.calls.length).toEqual(1);
    expect(markerResetMock.mock.calls.length).toEqual(1);

    thumb.focused = true;

    expect(thumbInvertMock.mock.calls.length).toEqual(2);
    expect(thumbResetMock.mock.calls.length).toEqual(1);
    expect(markerInvertMock.mock.calls.length).toEqual(2);
    expect(markerResetMock.mock.calls.length).toEqual(1);

    thumb.hovered = false;

    expect(thumbInvertMock.mock.calls.length).toEqual(3);
    expect(thumbResetMock.mock.calls.length).toEqual(1);
    expect(markerInvertMock.mock.calls.length).toEqual(3);
    expect(markerResetMock.mock.calls.length).toEqual(1);

    thumb.focused = false;

    expect(thumbInvertMock.mock.calls.length).toEqual(3);
    expect(thumbResetMock.mock.calls.length).toEqual(2);
    expect(markerInvertMock.mock.calls.length).toEqual(3);
    expect(markerResetMock.mock.calls.length).toEqual(2);
  });

  test('invertColors()', () => {
    const color = 'rgb(255, 255, 133)';
    thumb.setPrimaryColor(color);

    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(color);

    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(
      '',
    );

    thumb.invertColors();

    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual('');

    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(
      color,
    );
  });

  test('resetColors', () => {
    const color = 'rgb(133, 255, 255)';
    thumb.setPrimaryColor(color);
    thumb.invertColors();

    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual('');

    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(
      color,
    );

    thumb.resetColors();

    expect(
      thumb.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(color);

    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(
      '',
    );
  });
});

describe('ThumbMarker view', () => {
  let marker: ThumbMarker;

  beforeEach(() => {
    marker = new ThumbMarker();
  });

  test('set text as child element', () => {
    const text = 'text';
    const anotherText = 'another text';

    expect(marker.children.length).toEqual(0);
    expect(marker.width).toEqual(0);
    expect(marker.nativeElement.style.getPropertyValue('width')).toEqual('');

    marker.text = text;
    expect(marker.children.length).toEqual(1);
    expect(marker.children[0]).toEqual(text);

    marker.text = anotherText;
    expect(marker.children.length).toEqual(1);
    expect(marker.children[0]).toEqual(anotherText);
  });
  test('set vertical orientation', () => {
    const positionCorrectionMock = jest.fn();
    marker.positionCorrection = positionCorrectionMock;

    expect(marker.isVertical).toBeFalsy();
    expect(positionCorrectionMock.mock.calls.length).toEqual(0);

    marker.vertical = true;

    expect(marker.isVertical).toBeTruthy();
    expect(positionCorrectionMock.mock.calls.length).toEqual(1);
  });
  test('positionCorrection()', () => {
    const resetMarginMock = jest.fn();
    const setVerticalMarginMock = jest.fn();

    marker.resetMargin = resetMarginMock;
    marker.setVerticalMargin = setVerticalMarginMock;

    expect(resetMarginMock.mock.calls.length).toEqual(0);
    expect(setVerticalMarginMock.mock.calls.length).toEqual(0);

    marker.vertical = true;

    expect(resetMarginMock.mock.calls.length).toEqual(0);
    expect(setVerticalMarginMock.mock.calls.length).toEqual(1);

    marker.vertical = false;

    expect(resetMarginMock.mock.calls.length).toEqual(1);
    expect(setVerticalMarginMock.mock.calls.length).toEqual(1);
  });
  test('setPrimaryColor()', () => {
    const color = 'rgb(255, 255, 133)';
    expect(marker.color).toEqual('');

    marker.setPrimaryColor(color);

    expect(marker.color).toEqual(color);
    expect(marker.nativeElement.style.getPropertyValue('border-color')).toEqual(
      '',
    );
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual('');
    expect(
      marker.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(color);
  });
  test('invertColors()', () => {
    const color = 'rgb(255, 255, 133)';
    marker.setPrimaryColor(color);
    marker.invertColors();

    expect(
      marker.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual('');
    expect(marker.nativeElement.style.getPropertyValue('border-color')).toEqual(
      color,
    );
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(color);
  });
  test('resetColors()', () => {
    const color = 'rgb(255, 255, 133)';
    marker.setPrimaryColor(color);
    marker.invertColors();

    expect(
      marker.nativeElement.style.getPropertyValue('border-color'),
    ).not.toEqual('');
    expect(marker.nativeElement.style.getPropertyValue('color')).not.toEqual(
      '',
    );

    marker.resetColors();

    expect(marker.nativeElement.style.getPropertyValue('border-color')).toEqual(
      '',
    );
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual('');
    expect(
      marker.nativeElement.style.getPropertyValue('background-color'),
    ).toEqual(color);
  });

  test('setVerticalMargin()', () => {
    expect(marker.nativeElement.style.getPropertyValue('margin-top')).toEqual(
      '',
    );

    marker.setVerticalMargin();
    expect(
      marker.nativeElement.style.getPropertyValue('margin-top'),
    ).not.toEqual('');
  });
  test('resetMargin()', () => {
    marker.setVerticalMargin();
    expect(
      marker.nativeElement.style.getPropertyValue('margin-top'),
    ).not.toEqual('');

    marker.resetMargin();
    expect(marker.nativeElement.style.getPropertyValue('margin-top')).toEqual(
      '',
    );
  });
});
