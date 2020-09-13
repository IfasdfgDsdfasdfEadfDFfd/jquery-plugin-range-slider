/* eslint-disable fsd/no-function-declaration-in-event-listener */
const $ = require('jquery');
require('../src');
require('./index.scss');


(function (api) {
  const el = $('#js-configurator-id-0');

  const left = el.find('.configurator__value-left');
  const right = el.find('.configurator__value-right');

  api.subscirbe(state => {
    console.log('client', state.value);

    left.val(state.value[0]);
    right.val(state.value[1]);

    el.find('.configurator__min').val(state.min);
    el.find('.configurator__max').val(state.max);
    el.find('.configurator__step').val(state.step);

    el.find('.configurator__orient').attr('checked', state.vertical);
    el.find('.configurator__marker-visibility').attr('checked', state.markerVisibility);
    el.find('.configurator__interval-mode').attr('checked', state.intervalMode);

  });

  left.on('focusout', event => api.setValue([event.target.value, right.val()].map(val => parseInt(val))));
  right.on('focusout', event => api.setValue([left.val(), event.target.value].map(val => parseInt(val))));

  el.find('.configurator__min').on('focusout', (event) => api.setMin(event.target.value));
  el.find('.configurator__max').on('focusout', (event) => api.setMax(event.target.value));
  el.find('.configurator__step').on('focusout', (event) => api.setStep(event.target.value));

  el.find('.configurator__orient').on('click', (event) => api.setOrientVertical(!event.target.hasAttribute('checked')));
  el.find('.configurator__marker-visibility').on('click', (event) => api.setMarkerVisibility(!event.target.hasAttribute('checked')));
  el.find('.configurator__interval-mode').on('click', (event) => api.setIntervalMode(!event.target.hasAttribute('checked')));

})($('#js-range-slider-id-0').createRangeSlider({
  value: [25, 75],
}));
