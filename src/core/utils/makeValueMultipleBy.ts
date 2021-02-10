const makeValueMultipleBy = (value: number, multiplier: number): number => {
  if (Math.abs(value) < multiplier) {
    return value % multiplier === 0 ? value : multiplier;
  }

  if (Math.round(value) !== value && Math.round(multiplier) === multiplier) {
    value = Math.floor(value);
  }

  if (Math.round(multiplier) !== multiplier) {
    const floatPrecision = 10 ** multiplier.toString().split('.')[1].length;

    value *= floatPrecision;
    multiplier *= floatPrecision;

    return (value - Math.round(value % multiplier)) / floatPrecision;
  }

  return value - Math.round(value % multiplier);
};

export { makeValueMultipleBy };
