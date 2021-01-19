/* I know this is an unjustified overcomplicated but I like it */

const makeValue = (
  value: number,
): { multipleBy: (step: number) => number } => ({
  multipleBy: step => {
    if (Math.abs(value) < step) {
      return value % step === 0 ? value : step;
    }

    if (Math.round(value) !== value && Math.round(step) === step) {
      value = Math.floor(value);
    }

    if (Math.round(step) !== step) {
      const stepPrecision = step.toString().split('.')[1].length;
      const multiplier = 10 ** stepPrecision;

      value *= multiplier;
      step *= multiplier;

      return (value - Math.round(value % step)) / multiplier;
    }

    return value - Math.round(value % step);
  },
});

export { makeValue };
