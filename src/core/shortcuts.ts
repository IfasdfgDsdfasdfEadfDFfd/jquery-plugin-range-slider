import { View } from "./view";


class HiddenView extends View {
  readonly hidingElementClassName!: string;

  set hidden(value: boolean) {
    this.element.classList.toggle(this.hidingElementClassName, value);
  }
}

export { HiddenView };
