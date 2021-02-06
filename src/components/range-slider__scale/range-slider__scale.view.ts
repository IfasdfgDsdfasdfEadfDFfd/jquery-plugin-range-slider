import { View } from '@core';
import { memo } from 'core/utils';

@memo(['updateItems'])
class Scale extends View<ScaleProps> {
  tag = 'ul';
  attrs = {
    class: 'range-slider__track-scale',
  };

  render({ items }: ScaleProps): void {
    this.updateItems(items);
  }

  updateItems(newItems: string[]): void {
    this.nativeElement.innerHTML = '';

    this.children = newItems.reduce((newChildren, value, index) => {
      const item = new ScaleItem();

      item.init(this.nativeElement);
      item.render({ buttonText: value });

      return { ...newChildren, [index]: item };
    }, {} as ViewChildren);
  }
}

class ScaleItem extends View<ScaleItemProps> {
  tag = 'li';
  attrs = {
    class: 'range-slider__track-scale__item',
  };
  children = {
    button: new ScaleItemButton(),
  };

  render({ buttonText }: ScaleItemProps): void {
    this.children.button.render({ text: buttonText });
  }
}

@memo(['updateText'])
class ScaleItemButton extends View<ScaleItemButtonProps> {
  tag = 'button';
  attrs = {
    type: 'button',
    class: 'range-slider__track-scale__item-button',
  };

  render({ text }: ScaleItemButtonProps): void {
    this.updateText(text);
  }

  updateText(newText: string): void {
    this.nativeElement.textContent = newText;
  }
}

export { Scale, ScaleItem, ScaleItemButton };
