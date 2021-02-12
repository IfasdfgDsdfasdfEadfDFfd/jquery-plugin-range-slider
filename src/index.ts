import './index.css';
import './vars.css';

import { RangeSliderComponent } from 'components/range-slider';

const initData: RangeSliderModelData = {
  root: {
    color: '#FF9933',
  },
  input: {
    min: 0,
    max: 16,
    step: 2,
    values: [6, 10, 12],
  },
  thumb: {},
  track: {},
  scale: {
    values: Array(10)
      .fill(null)
      .map((_, index) => String(index)),
  },
};

const rootComponent = new RangeSliderComponent();
rootComponent.attachToDocument(document.body, initData);

if (process.env.NODE_ENV === 'development') {
  console.log('logger attached!');

  rootComponent.model.subscribe(data => {
    console.log(data);
  });
}
