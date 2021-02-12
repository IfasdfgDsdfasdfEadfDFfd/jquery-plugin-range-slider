import { Controller } from '@core';
import { memo } from 'core/utils';

@memo({ methods: ['calcOffset', 'calcOffsets', 'createProgressSegments'], cacheSize: Infinity })
class TrackController extends Controller {
  mapState({ root, input }: RangeSliderModelData): Partial<TrackProps> {
    const offsets = this.calcOffsets({
      min: input.min,
      max: input.max,
      values: input.values,
    });

    const progressSegments = this.createProgressSegments(offsets);
    const thumbItems = this.createThumbPositions(input.values, offsets);

    return {
      color: root.color,
      progressSegments,
      thumbItems,
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

  calcOffsets({ min, max, values }: { min: number; max: number; values: number[] }): number[] {
    return values.map(value => this.calcOffset({ min, max, value }));
  }

  calcOffset({ min, max, value }: { min: number; max: number; value: number }): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export { TrackController };
