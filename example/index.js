const $ = require('jquery');
require('jquery-plugin-range-slider');
require('./index.scss');

window.addEventListener('load', () => {
  for (const index of [1, 2, 3, 4, 5]) {
    attachConfigurationPanelToRangeSlider(index);
  }
});

const attachConfigurationPanelToRangeSlider = index => {
  (function (api) {
    const el = $(`#js-configuration-id-${index}`);

    const left = el.find('.configuration__value-left');
    const right = el.find('.configuration__value-right');

    api.subscribe(state => {
      left.val(state.value[0]);
      right.val(state.value[1]);

      el.find('.configuration__min').val(state.min);
      el.find('.configuration__max').val(state.max);
      el.find('.configuration__step').val(state.step);

      el.find('.configuration__orient').attr('checked', state.vertical);
      el.find('.configuration__interval-mode').attr(
        'checked',
        state.intervalMode,
      );
      el.find('.configuration__marker-visibility').attr(
        'checked',
        state.markerVisibility,
      );
      el.find('.configuration__track-scale-visibility').attr(
        'checked',
        state.trackScaleVisibility,
      );
    });

    left.on('focusout', event =>
      api.setLeftValue(parseInt(event.target.value)),
    );
    right.on('focusout', event =>
      api.setRightValue(parseInt(event.target.value)),
    );

    el.find('.configuration__min').on('focusout', event =>
      api.setMin(parseInt(event.target.value)),
    );
    el.find('.configuration__max').on('focusout', event =>
      api.setMax(parseInt(event.target.value)),
    );
    el.find('.configuration__step').on('focusout', event =>
      api.setStep(parseInt(event.target.value)),
    );

    let unsubscribe = () => {};
    el.find('.configuration__prefix').on('focusout', event => {
      unsubscribe();
      unsubscribe = api.registerMiddleware(value => {
        return `${event.target.value}${value}`;
      });
    });

    el.find('.configuration__orient').on('click', event =>
      api.setOrientVertical(!event.target.hasAttribute('checked')),
    );

    el.find('.configuration__interval-mode').on('click', event =>
      api.setIntervalMode(!event.target.hasAttribute('checked')),
    );

    el.find('.configuration__marker-visibility').on('click', event =>
      api.setMarkerVisibility(!event.target.hasAttribute('checked')),
    );

    el.find('.configuration__track-scale-visibility').on('click', event =>
      api.setTrackScaleVisibility(!event.target.hasAttribute('checked')),
    );
  })(
    $(`#js-range-slider-id-${index}`).rangeSlider({
      value: [25, 75],
    }),
  );
};
