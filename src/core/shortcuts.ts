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

export { getOffset };
