const $ = require('jquery');
require('jquery-plugin-range-slider');
require('./index.scss');

window.addEventListener('load', () => {
  const parameters = [
    {
      index: 1,
      props: {
        step: 10,
        from: 300,
        to: 700,
        min: 0,
        max: 1000,
        prefix: '$ ',
        postfix: '',
        color: '#7bc043',
        markerVisibility: true,
        trackScaleVisibility: true,
        intervalMode: true,
        vertical: false,
      },
    },
    {
      index: 2,
      props: {
        step: 1,
        from: 1,
        to: 2,
        min: 1,
        max: 6,
        prefix: '',
        postfix: value => (value > 1 ? ' rooms' : ' room'),
        color: '#0392cf',
        markerVisibility: false,
        trackScaleVisibility: true,
        intervalMode: false,
        vertical: false,
      },
    },
    {
      index: 3,
      props: {},
    },
    {
      index: 4,
      props: {},
    },
    {
      index: 5,
      props: {},
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

    const min = el.find('.configuration__min');
    const max = el.find('.configuration__max');
    const step = el.find('.configuration__step');

    const prefix = el.find('.configuration__prefix');
    const primaryColor = el.find('.configuration__primary-color');
    const postfix = el.find('.configuration__postfix');

    const orient = el.find('.configuration__orient');
    const intervalMode = el.find('.configuration__interval-mode');
    const markerVisibility = el.find('.configuration__marker-visibility');
    const trackScaleVisibility = el.find(
      '.configuration__track-scale-visibility',
    );

    api.subscribe(state => {
      left.val(state.value[0]);
      right.val(state.value[1]);

      min.val(state.min);
      max.val(state.max);
      step.val(state.step);

      prefix.val(state.prefix);
      postfix.val(state.postfix);
      primaryColor.val(state.primaryColor);

      orient.attr('checked', state.vertical);
      intervalMode.attr('checked', state.intervalMode);
      markerVisibility.attr('checked', state.markerVisibility);
      trackScaleVisibility.attr('checked', state.trackScaleVisibility);
    });

    left.on('focusout', event => api.setLeftValue(Number(event.target.value)));
    right.on('focusout', event =>
      api.setRightValue(Number(event.target.value)),
    );

    min.on('focusout', event => api.setMin(Number(event.target.value)));
    max.on('focusout', event => api.setMax(Number(event.target.value)));
    step.on('focusout', event => api.setStep(Number(event.target.value)));

    prefix.on('focusout', event => {
      api.setPrefix(event.target.value);
    });

    postfix.on('focusout', event => {
      api.setPostfix(event.target.value);
    });

    orient.on('click', event =>
      api.setOrientVertical(!event.target.hasAttribute('checked')),
    );

    intervalMode.on('click', event =>
      api.setIntervalMode(!event.target.hasAttribute('checked')),
    );

    markerVisibility.on('click', event =>
      api.setMarkerVisibility(!event.target.hasAttribute('checked')),
    );

    trackScaleVisibility.on('click', event =>
      api.setTrackScaleVisibility(!event.target.hasAttribute('checked')),
    );

    primaryColor.on('focusout', event => {
      api.setPrimaryColor(event.target.value);
    });
  })($(`#js-range-slider-id-${index}`).rangeSlider(props));
};
