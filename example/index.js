// const $ = require('jquery');
// require('jquery-plugin-range-slider');
// require('./index.scss');

// window.addEventListener('load', () => {
//   const parameters = [];
//   for (const { index, props } of parameters) {
//     attachConfigurationPanelToRangeSlider(index, props);
//   }
// });

// const attachConfigurationPanelToRangeSlider = (index, props) => {
//   (function (api) {
//     const el = $(`#js-configuration-id-${index}`);

//     const $fixedValues = el.find('.js-configuration__values');

//     const $left = el.find('.js-configuration__value-left');
//     const $right = el.find('.js-configuration__value-right');

//     const $min = el.find('.js-configuration__min');
//     const $max = el.find('.js-configuration__max');
//     const $step = el.find('.js-configuration__step');

//     const $prefix = el.find('.js-configuration__prefix');
//     const $postfix = el.find('.js-configuration__postfix');
//     const $primaryColor = el.find('.js-configuration__primary-color');

//     const $orient = el.find('.js-configuration__orient');
//     const $intervalMode = el.find('.js-configuration__interval-mode');
//     const $markerVisibility = el.find('.js-configuration__marker-visibility');
//     const $trackScaleVisibility = el.find('.js-configuration__track-scale-visibility');
//   })($(`#js-range-slider-id-${index}`).rangeSlider(props));
// };
