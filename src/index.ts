import './index.css';
import './vars.css';

import jQuery from 'jquery';
import { main } from './plugin/plugin';

jQuery.fn.extend({
  rangeSlider: main,
});
