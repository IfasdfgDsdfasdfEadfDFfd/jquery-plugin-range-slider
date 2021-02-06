import { RangeSliderComponent } from 'components/range-slider';
import { InputComponent } from 'components/range-slider__input';
import { ScaleComponent } from 'components/range-slider__scale';
import { TrackComponent } from 'components/range-slider__track';

const rootComponent = new RangeSliderComponent();
rootComponent.attachChildComponents([
  new InputComponent(),
  new TrackComponent(),
  new ScaleComponent(),
]);

rootComponent.attachToDocument(document.body);
