/* eslint-disable fsd/no-function-declaration-in-event-listener */
const $ = require('jquery');
require('../src');
require('./index.scss');


(function (api) {
  const el = $('#js-configurator-id-0');

  const left = el.find('.configurator__value-left');
  const right = el.find('.configurator__value-right');

  api.subscirbe(state => {

    left.val(state.value[0]);
    right.val(state.value[1]);

    el.find('.configurator__min').val(state.min);
    el.find('.configurator__max').val(state.max);
    el.find('.configurator__step').val(state.step);

    el.find('.configurator__orient').attr('checked', state.vertical);
    el.find('.configurator__marker-visibility').attr('checked', state.markerVisibility);
    el.find('.configurator__interval-mode').attr('checked', state.intervalMode);

  });

  left.on('focusout', event => api.setLeftValue(parseInt(event.target.value)));
  right.on('focusout', event => api.setRightValue(parseInt(event.target.value)));

  el.find('.configurator__min').on('focusout', (event) => api.setMin(parseInt(event.target.value)));
  el.find('.configurator__max').on('focusout', (event) => api.setMax(parseInt(event.target.value)));
  el.find('.configurator__step').on('focusout', (event) => api.setStep(parseInt(event.target.value)));

  el.find('.configurator__orient').on('click', (event) => api.setOrientVertical(!event.target.hasAttribute('checked')));
  el.find('.configurator__marker-visibility').on('click', (event) => api.setMarkerVisibility(!event.target.hasAttribute('checked')));
  el.find('.configurator__interval-mode').on('click', (event) => api.setIntervalMode(!event.target.hasAttribute('checked')));

})($('#js-range-slider-id-0').rangeSlider({
  value: [25, 75],
}));
