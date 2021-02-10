import { Controller } from '@core';
import { memo } from 'core/utils';

@memo({ methods: ['calcOffset', 'calcOffsets', 'createOffsetPairs'], cacheSize: Infinity })
class TrackController extends Controller {
  mapState({ root, input }: RangeSliderModelData): Partial<TrackProps> {
    const offsets = this.calcOffsets({
      min: input.min,
      max: input.max,
      values: input.values,
    });

    const offsetPairs = this.createOffsetPairs(offsets);

    return {
      color: root.color,
      offsetPairs,
    };
  }

  createOffsetPairs(offsets: number[]): Array<{ left: number; right: number }> {
    const pairs = [];

    for (let index = 0; index < offsets.length - 1; index++) {
      if (offsets[index + 1]) {
        pairs.push({
          left: offsets[index],
          right: offsets[index + 1],
        });
      }
    }

    if (pairs.length === 0) {
      pairs.push({
        left: 0,
        right: offsets[0],
      });
    }

    return pairs;
  }

  calcOffsets({ min, max, values }: { min: number; max: number; values: number[] }): number[] {
    return values.map(value => this.calcOffset({ min, max, value }));
  }

  calcOffset({ min, max, value }: { min: number; max: number; value: number }): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export { TrackController };
