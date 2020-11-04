const $ = require('jquery');
require('jquery-plugin-range-slider');
require('./index.scss');

window.addEventListener('load', () => {
  const parameters = [
    {
      index: 1,
      props: {
        value: [10, 20],
      },
    },
    {
      index: 2,
      props: {
        value: [13, 73],
      },
    },
    {
      index: 3,
      props: {
        value: [54, 58],
      },
    },
    {
      index: 4,
      props: {
        value: [21, 53],
      },
    },
    {
      index: 5,
      props: {
        value: [22, 36],
      },
    },
  ];
  for (const { index, props } of parameters) {
    attachConfigurationPanelToRangeSlider(index, props);
  }
});

const attachConfigurationPanelToRangeSlider = (index, props) => {
  (function (api) {
    const el = $(`#js-configuration-id-${index}`);

    const left = el.find('.configuration__value-left');
    const right = el.find('.configuration__value-right');
    const primaryColor = el.find('.configuration__primary-color');
    const postfix = el.find('.configuration__postfix');

    api.subscribe(state => {
      left.val(state.value[0]);
      right.val(state.value[1]);

      el.find('.configuration__min').val(state.min);
      el.find('.configuration__max').val(state.max);
      el.find('.configuration__step').val(state.step);
      el.find('.configuration__prefix').val(state.prefix);
      postfix.val(state.postfix);
      primaryColor.val(state.primaryColor);

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

    left.on('focusout', event => api.setLeftValue(Number(event.target.value)));
    right.on('focusout', event =>
      api.setRightValue(Number(event.target.value)),
    );

    el.find('.configuration__min').on('focusout', event =>
      api.setMin(Number(event.target.value)),
    );
    el.find('.configuration__max').on('focusout', event =>
      api.setMax(Number(event.target.value)),
    );
    el.find('.configuration__step').on('focusout', event =>
      api.setStep(Number(event.target.value)),
    );

    el.find('.configuration__prefix').on('focusout', event => {
      api.setPrefix(event.target.value);
    });

    postfix.on('focusout', event => {
      api.setPostfix(event.target.value);
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

    primaryColor.on('focusout', event => {
      api.setPrimaryColor(event.target.value);
    });
  })($(`#js-range-slider-id-${index}`).rangeSlider(props));
};
