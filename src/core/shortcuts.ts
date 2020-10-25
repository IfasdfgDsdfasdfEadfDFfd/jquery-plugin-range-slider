import { View } from './view';

class HiddenView extends View {
  hidingElementClassName!: string;

  set hidden(value: boolean) {
    this.element.classList.toggle(this.hidingElementClassName, value);
  }
}

const getOffset = (
  selfWidth: number,
  parentWidth: number,
  value: number,
  max: number,
  min: number,
): number => {
  const ratio = (value - min) / (max - min);
  const offsetPercent = 100 * ratio;
  const selfPercent = (selfWidth / parentWidth) * 100 * ratio;

  return offsetPercent - selfPercent;
};

export { HiddenView, getOffset };
