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
    if (offsets.length === 1) {
      return [{ left: 0, right: offsets[0] }];
    } else if (offsets.length === 2) {
      return [{ left: offsets[0], right: offsets[1] }];
    } else {
      return [
        ...this.createOffsetPairs(offsets.slice(0, 2)),
        ...this.createOffsetPairs(offsets.slice(2)),
      ];
    }
  }

  calcOffsets({ min, max, values }: { min: number; max: number; values: number[] }): number[] {
    return values.map(value => this.calcOffset({ min, max, value }));
  }

  calcOffset({ min, max, value }: { min: number; max: number; value: number }): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export { TrackController };
