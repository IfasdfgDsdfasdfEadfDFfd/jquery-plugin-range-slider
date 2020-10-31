/* I know this is an unjustified overcomplicated but I like it */

const makeValue = (
  value: number,
): { multipleBy: (step: number) => number } => ({
  multipleBy: step => value - Math.round(value % step),
});

export { makeValue };
