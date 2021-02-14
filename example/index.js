import $ from 'jquery';
import { main } from 'jquery-plugin-range-slider';

window.onload = () => {
  [1, 2, 3, 4, 5].forEach(index => {
    const api = $(`#js-range-slider-${index}`).rangeSlider();

    const $panel = $(`#js-configuration-panel-${index}`);

    const $vertical = $panel.find('.js-checkbox-vertical');
    $vertical.on('change', event => {
      api.setVertical(event.target.checked);
    });
  });
};
