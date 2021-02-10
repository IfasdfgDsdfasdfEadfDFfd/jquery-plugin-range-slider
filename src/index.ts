import './vars.css';

import { RangeSliderComponent } from 'components/range-slider';

const initData: RangeSliderModelData = {
  root: {
    color: '#FFEE33',
  },
  input: {
    min: 0,
    max: 9,
    values: [0, 5, 9],
  },
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
