import { StateViewModifier } from 'src/core';
import { IRangeSliderState } from '../reducer';

const makePrefixModifier = (prefix: string) => {
  return (state: IRangeSliderState): IRangeSliderState => {
    return {
      ...state,
      value: [`${prefix}${state.value[0]}`, `${prefix}${state.value[1]}`],
    };
  };
};

export { makePrefixModifier };
