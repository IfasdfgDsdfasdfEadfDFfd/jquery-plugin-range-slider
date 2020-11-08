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

type cb = (value: number) => string;
const makeValueLikeCallback = (value: string | cb): cb => {
  return typeof value === 'function' ? value : () => value;
};

export { getOffset, makeValueLikeCallback, cb };
