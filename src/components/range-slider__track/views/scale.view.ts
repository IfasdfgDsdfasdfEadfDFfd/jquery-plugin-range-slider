import { View, ContainerView } from '@core';
import { memo } from 'core/utils';

class Scale extends ContainerView<ScaleProps> {
  tag = 'ul';
  attrs = {
    class: 'range-slider__scale',
  };

  childViewClass = ScaleItem;

  getProps({ items: iterator, ...restProps }: ScaleProps): ContainerViewProps {
    return { iterator, restProps };
  }
}

@memo({ methods: ['updateOffset'] })
class ScaleItem extends View<ScaleItemProps> {
  tag = 'li';
  attrs = {
    class: 'range-slider__scale__item',
  };
  children = {
    button: new ScaleItemButton(),
  };

  render({ offset, buttonText, ratio }: ScaleItemProps): void {
    this.children.button.render({ text: buttonText });
    this.updateOffset(offset, ratio);
  }

  updateOffset(offset: number, ratio: number): void {
    const selfOffset =
      this.nativeElement.offsetWidth / (this.nativeElement.parentElement?.offsetWidth || 1);
    this.nativeElement.style.setProperty('left', `${offset + ((ratio - selfOffset) * 100) / 2}%`);
  }
}

@memo({ methods: ['updateText'] })
class ScaleItemButton extends View<ScaleItemButtonProps> {
  tag = 'button';
  attrs = {
    type: 'button',
    class: 'range-slider__scale__button',
  };

  render({ text }: ScaleItemButtonProps): void {
    this.updateText(text);
  }

  updateText(newText: string): void {
    this.nativeElement.textContent = newText;
  }
}

export { Scale, ScaleItem, ScaleItemButton };
