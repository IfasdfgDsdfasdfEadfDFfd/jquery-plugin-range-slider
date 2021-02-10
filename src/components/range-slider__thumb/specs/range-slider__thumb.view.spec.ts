import { Thumb, ThumbMarker } from '../range-slider__thumb.view';

describe('Thumb', () => {
  let thumb: Thumb;
  const props: ThumbProps = {
    color: 'rgb(255, 255, 255)',
    markerText: 'marker text',
  };

  beforeEach(() => {
    thumb = new Thumb();
    thumb.init();
    thumb.render(props);
  });

  test('updateColor()', () => {
    const newColor = 'rgb(133, 133, 133)';
    expect(newColor).not.toEqual(props.color);

    thumb.updateColor(newColor);
    expect(thumb.nativeElement.style.getPropertyValue('border-color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(thumb.nativeElement).toMatchSnapshot();
  });
});

describe('ThumbMarker', () => {
  let marker: ThumbMarker;

  const props: ThumbMarkerProps = {
    color: 'rgb(255, 255, 255)',
    text: 'marker text',
  };

  beforeEach(() => {
    marker = new ThumbMarker();
    marker.init();
    marker.render(props);
  });

  test('updateText()', () => {
    const newText = 'new marker text';

    expect(newText).not.toEqual(props.text);
    marker.updateText(newText);
    expect(marker.nativeElement.textContent).toEqual(newText);
  });

  test('updateColor()', () => {
    const newColor = 'rgb(133, 133, 133)';

    expect(newColor).not.toEqual(props.color);
    marker.updateColor(newColor);
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(marker.nativeElement).toMatchSnapshot();
  });
});
