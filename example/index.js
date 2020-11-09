const $ = require('jquery');
require('jquery-plugin-range-slider');
require('./index.scss');

window.addEventListener('load', () => {
  const parameters = [
    {
      index: 1,
      props: {
        min: 0,
        max: 1000,
        step: 10,
        from: 300,
        to: 700,
        prefix: '$ ',
        color: '#7bc043',
      },
    },
    {
      index: 2,
      props: {
        min: 1,
        max: 6,
        step: 1,
        from: 1,
        to: 2,
        postfix: value => (value > 1 ? ' rooms' : ' room'),
        color: '#0392cf',
        markerVisibility: false,
        intervalMode: false,
      },
    },
    {
      index: 3,
      props: {
        min: -18,
        max: 22.3,
        step: 0.1,
        from: -7.5,
        to: 12.3,
        postfix: '°C',
        color: '#ffcc5c',
      },
    },
    {
      index: 4,
      props: {
        values: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        from: 'Tue',
        to: 'Fri',
        color: '#fe4a49',
      },
    },
    {
      index: 5,
      props: {
        min: 0,
        max: 120,
        step: 5,
        to: 80,
        postfix: 'mm',
        color: '#8b9dc3',
        intervalMode: false,
        vertical: true,
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

    const $fixedValues = el.find('.configuration__values');

    const $left = el.find('.configuration__value-left');
    const $right = el.find('.configuration__value-right');

    const $min = el.find('.configuration__min');
    const $max = el.find('.configuration__max');
    const $step = el.find('.configuration__step');

    const $prefix = el.find('.configuration__prefix');
    const $postfix = el.find('.configuration__postfix');
    const $primaryColor = el.find('.configuration__primary-color');

    const $orient = el.find('.configuration__orient');
    const $intervalMode = el.find('.configuration__interval-mode');
    const $markerVisibility = el.find('.configuration__marker-visibility');
    const $trackScaleVisibility = el.find(
      '.configuration__track-scale-visibility',
    );

    api.subscribe(state => {
      $fixedValues.val(state.fixedValues.toString().replaceAll(',', ' '));

      $left.attr('disabled', state.fixedValues.length > 0);
      $right.attr('disabled', state.fixedValues.length > 0);
      $min.attr('disabled', state.fixedValues.length > 0);
      $max.attr('disabled', state.fixedValues.length > 0);
      $step.attr('disabled', state.fixedValues.length > 0);

      $left.val(state.value[0]);
      $right.val(state.value[1]);

      $min.val(state.min);
      $max.val(state.max);
      $step.val(state.step);

      $prefix.val(state.prefix);
      $postfix.val(state.postfix);
      $primaryColor.val(state.primaryColor);

      $orient.attr('checked', state.vertical);
      $intervalMode.attr('checked', state.intervalMode);
      $markerVisibility.attr('checked', state.markerVisibility);
      $trackScaleVisibility.attr('checked', state.trackScaleVisibility);
    });

    $fixedValues.on('focusout', event =>
      api.setFixedValues(
        event.target.value.split(' ').filter(value => value.trim()),
      ),
    );

    $left.on('focusout', event => api.setLeftValue(Number(event.target.value)));
    $right.on('focusout', event =>
      api.setRightValue(Number(event.target.value)),
    );

    $min.on('focusout', event => api.setMin(Number(event.target.value)));
    $max.on('focusout', event => api.setMax(Number(event.target.value)));
    $step.on('focusout', event => api.setStep(Number(event.target.value)));

    $prefix.on('focusout', event => {
      api.setPrefix(event.target.value);
    });

    $postfix.on('focusout', event => {
      api.setPostfix(event.target.value);
    });

    $orient.on('click', event =>
      api.setOrientVertical(!event.target.hasAttribute('checked')),
    );

    $intervalMode.on('click', event =>
      api.setIntervalMode(!event.target.hasAttribute('checked')),
    );

    $markerVisibility.on('click', event =>
      api.setMarkerVisibility(!event.target.hasAttribute('checked')),
    );

    $trackScaleVisibility.on('click', event =>
      api.setTrackScaleVisibility(!event.target.hasAttribute('checked')),
    );

    $primaryColor.on('focusout', event => {
      api.setPrimaryColor(event.target.value);
    });
  })($(`#js-range-slider-id-${index}`).rangeSlider(props));
};
