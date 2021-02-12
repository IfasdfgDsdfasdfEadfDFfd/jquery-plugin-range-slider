type ViewAttrs = Record<string, string>;
type ViewChildren = Record<string, ViewInterface>;
type ViewProps = Record<string, unknown>;

interface ViewInterface {
  nativeElement: HTMLElement;

  tag: string;
  attrs: ViewAttrs;
  children: ViewChildren;

  init(parentNode?: Node): void;
  render(props: ViewProps): void;

  attachAttrs(attrs: ViewAttrs): void;
}

interface ViewConstructable {
  new (): ViewInterface;
}

interface ContainerViewProps extends ViewProps {
  iterator: Array<ViewProps>;
  restProps: ViewProps;
}
