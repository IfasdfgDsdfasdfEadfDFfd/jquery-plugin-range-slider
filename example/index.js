const $ = require('jquery');
require('../src');
require('./index.scss');


(function (api) {
  const el = $('#js-configurator-id-0');

  api.subscirbe(state => {
    console.log(state)

    el.find('.configurator__value').val(state.value);
    el.find('.configurator__min').val(state.min);
    el.find('.configurator__max').val(state.max);
    el.find('.configurator__step').val(state.step);

    el.find('.configurator__orient').attr('checked', state.vertical);
    el.find('.configurator__marker-visibility').attr('checked', state.markerVisibility);

  });

  el.find('.configurator__value').focusout((event) => api.setValue(event.target.value));
  el.find('.configurator__min').focusout((event) => api.setMin(event.target.value));
  el.find('.configurator__max').focusout((event) => api.setMax(event.target.value));
  el.find('.configurator__step').focusout((event) => api.setStep(event.target.value));

  el.find('.configurator__orient').click((event) => api.setOrientVertical(!event.target.hasAttribute('checked')));
  el.find('.configurator__marker-visibility').click((event) => api.setMarkerVisibility(!event.target.hasAttribute('checked')));

})($('#js-range-slider-id-0').createRangeSlider({
  value: 10,
}));
