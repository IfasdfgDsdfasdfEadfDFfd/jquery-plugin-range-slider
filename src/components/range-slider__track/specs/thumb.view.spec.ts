import { ThumbItem, ThumbItemMarker } from 'components/range-slider__track';

describe('ThumbItem', () => {
  let thumbItem: ThumbItem;
  const props: ThumbItemProps = {
    color: 'rgb(255, 255, 255)',
    markerText: 'marker text',
    positionOffset: 0,
  };

  beforeEach(() => {
    thumbItem = new ThumbItem();
    thumbItem.init();
    thumbItem.render(props);
  });

  test('updatePosition()', () => {
    const newPositionOffset = 10;

    thumbItem.updatePosition(newPositionOffset);
    const elementOffset = parseFloat(thumbItem.nativeElement.style.getPropertyValue('left'));
    expect(elementOffset).toEqual(newPositionOffset);
  });
  test('updateColor()', () => {
    const newColor = 'rgb(133, 133, 133)';
    expect(newColor).not.toEqual(props.color);

    thumbItem.updateColor(newColor);
    expect(thumbItem.nativeElement.style.getPropertyValue('background-color')).toEqual(newColor);
  });

  test('to match snapshot', () => {
    expect(thumbItem.nativeElement).toMatchSnapshot();
  });
});

describe('ThumbItemMarker', () => {
  let marker: ThumbItemMarker;

  const props: ThumbItemMarkerProps = {
    color: 'rgb(255, 255, 255)',
    text: 'marker text',
  };

  beforeEach(() => {
    marker = new ThumbItemMarker();
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
