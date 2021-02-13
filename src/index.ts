import './index.css';
import './vars.css';

import { RangeSliderComponent } from 'components/range-slider';

const rootComponent = new RangeSliderComponent();
rootComponent.attachToDocument(document.body);

const documentStyles = getComputedStyle(document.documentElement);
const thumbWidth =
  parseFloat(documentStyles.getPropertyValue('--thumb-width')) *
  parseFloat(documentStyles.fontSize);
const ratio = thumbWidth / rootComponent.view.nativeElement.offsetWidth;

const initData: RangeSliderModelData = {
  root: {
    color: '#FF9933',
    ratio,
  },
  input: {
    min: 0,
    max: 16,
    step: 2,
    values: [6, 10, 12],
  },
  track: {},
};

rootComponent.coldStart(initData);

if (process.env.NODE_ENV === 'development') {
  console.log('logger attached!');

  rootComponent.model.subscribe(data => {
    console.log(data);
  });
}
