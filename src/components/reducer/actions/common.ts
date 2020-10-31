/* I know this is an unjustified overcomplicated but I like it */

const makeValue = (
  value: number,
): { multipleBy: (step: number) => number } => ({
  multipleBy: step => {
    if (Math.abs(value) < step) {
      return value % step === 0 ? value : step;
    }

    return value - Math.round(value % step);
  },
});

export { makeValue };
