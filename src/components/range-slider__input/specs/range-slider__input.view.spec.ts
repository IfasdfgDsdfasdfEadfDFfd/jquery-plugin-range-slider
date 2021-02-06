import { InputItemThumbMarker } from 'components/range-slider__input';

describe('InputItemThumbMarker', () => {
  let marker: InputItemThumbMarker;

  const text = 'marker text';
  const color = 'rgb(133, 133, 133)';

  beforeEach(() => {
    marker = new InputItemThumbMarker();
    marker.init();
    marker.render({ text, color });
  });

  test('updateText()', () => {
    expect(marker.nativeElement.textContent).toEqual(text);

    const newText = 'new marker text';
    expect(newText).not.toEqual(text);

    marker.updateText(newText);
    expect(marker.nativeElement.textContent).toEqual(newText);
  });

  test('updateColor()', () => {
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(color);

    const newColor = 'rgb(255, 255, 255)';
    expect(newColor).not.toEqual(color);

    marker.updateColor(newColor);
    expect(marker.nativeElement.style.getPropertyValue('color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(marker.nativeElement).toMatchSnapshot();
  });
});
