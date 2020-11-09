type cb = (value: number) => string;
const makeValueLikeCallback = (value: string | cb): cb => {
  return typeof value === 'function' ? value : () => value;
};

export { makeValueLikeCallback, cb };
