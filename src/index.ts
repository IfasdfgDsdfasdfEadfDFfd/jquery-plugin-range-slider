import './vars.css';

import { RangeSliderComponent } from 'components/range-slider';

const initData: RangeSliderModelData = {
  root: {
    color: '#FFEE33',
  },
  input: {
    min: 0,
    max: 9,
    values: [0, 9],
  },
  track: {
    bars: [
      {
        leftOffset: '25%',
        rightOffset: '75%',
      },
      {
        leftOffset: '30%',
        rightOffset: '80%',
      },
    ],
  },
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
    console.debug(`root changed:`, data);
  });

  Object.values(rootComponent.model.linkedModels).forEach(model => {
    console.log(`${model.name} logger attached!`);

    model.subscribe(data => {
      console.debug(`${model.name} changed:`, data);
    });
  });
}
