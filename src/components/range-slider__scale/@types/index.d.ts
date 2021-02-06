interface ScaleModelData extends ModelData {
  values: string[];
}

interface ScaleProps extends ViewProps {
  items: string[];
}

interface ScaleItemProps extends ViewProps {
  buttonText: string;
}

interface ScaleItemButtonProps extends ViewProps {
  text: string;
}
