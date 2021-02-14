import './index.css';
import './vars.css';

import jQuery from 'jquery';
import { main } from './plugin';

jQuery.fn.extend({
  rangeSlider: main,
});
