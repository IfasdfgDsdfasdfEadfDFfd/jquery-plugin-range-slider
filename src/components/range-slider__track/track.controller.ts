import { Controller } from '@core';
import { memo } from 'core/utils';

@memo({ methods: ['calcOffset', 'calcOffsets', 'createProgressSegments'], cacheSize: Infinity })
class TrackController extends Controller {
  mapState({ root, input }: RangeSliderModelData): Partial<TrackProps> {
    const offsets = this.calcOffsets({
      min: input.min,
      max: input.max,
      values: input.values,
      offsetRatio: root.ratio,
    });

    const progressSegments = this.createProgressSegments(offsets);
    const thumbItems = this.createThumbPositions(input.values, offsets);
    const scaleItems = this.createScaleValues({ ...input, offsetRatio: root.ratio });

    return {
      color: root.color,
      ratio: root.ratio,
      progressSegments,
      thumbItems,
      scaleItems,
    };
  }

  createProgressSegments(offsets: number[]): TrackProps['progressSegments'] {
    const segments = [];

    for (let index = 0; index < offsets.length - 1; index++) {
      if (offsets[index + 1]) {
        segments.push({
          leftOffset: offsets[index],
          rightOffset: offsets[index + 1],
        });
      }
    }

    if (segments.length === 0) {
      segments.push({
        leftOffset: 0,
        rightOffset: offsets[0],
      });
    }

    return segments;
  }

  createThumbPositions(values: number[], offsets: number[]): ThumbProps['thumbs'] {
    return values.map((value, index) => ({
      positionOffset: offsets[index],
      markerText: value.toString(),
    }));
  }

  createScaleValues({
    min,
    max,
    step,
    offsetRatio,
  }: {
    min: number;
    max: number;
    step: number;
    offsetRatio: number;
  }): ScaleProps['items'] {
    const result = [];

    for (let value = min; value <= max; value += step) {
      const offset = this.calcOffset({ min, max, value, offsetRatio });
      result.push({
        offset,
        buttonText: String(value),
      });
    }

    return result;
  }

  calcOffsets({
    min,
    max,
    values,
    offsetRatio,
  }: {
    min: number;
    max: number;
    values: number[];
    offsetRatio: number;
  }): number[] {
    return values.map(value => this.calcOffset({ min, max, value, offsetRatio }));
  }

  calcOffset({
    min,
    max,
    value,
    offsetRatio,
  }: {
    min: number;
    max: number;
    value: number;
    offsetRatio: number;
  }): number {
    const offset = ((value - min) / (max - min)) * 100;
    return offset - offset * offsetRatio;
  }
}

export { TrackController };
