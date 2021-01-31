type ViewAttrs = Record<string, string>;
type ViewChildren = Record<string, ViewInterface | string>;
type ViewProps = Record<string, unknown>;

interface ViewInterface {
  nativeElement: HTMLElement;

  tag: string;
  attrs: ViewAttrs;
  children: ViewChildren;

  initialized: boolean;

  init(): void;
  update(props: ViewProps): void;
  render(props: ViewProps): void;

  attachAttrs(attrs: ViewAttrs): void;
  attachChildren(children: ViewInterface[]): void;
}
