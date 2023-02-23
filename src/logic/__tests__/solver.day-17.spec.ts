import { describe, it, expect } from 'vitest';
import { Day17 } from '../solver.day-17';

describe('Day 17', () => {
  it('should find the last value after 2017', async () => {
    const answer = new Day17('3').solve();
    expect(await answer.partOne).toEqual('638');
  });

  it('should insert the next value after stepping forward', () => {
    expect(Day17['_step']({ cur: 0, buf: [0] }, 3)).toEqual({
      cur: 1,
      buf: [0, 1],
    });
    expect(Day17['_step']({ cur: 1, buf: [0, 1] }, 3)).toEqual({
      cur: 1,
      buf: [0, 2, 1],
    });
    expect(Day17['_step']({ cur: 1, buf: [0, 2, 1] }, 3)).toEqual({
      cur: 2,
      buf: [0, 2, 3, 1],
    });
    expect(
      Day17['_step']({ cur: 6, buf: [0, 5, 7, 2, 4, 3, 8, 6, 1] }, 3)
    ).toEqual({
      cur: 1,
      buf: [0, 9, 5, 7, 2, 4, 3, 8, 6, 1],
    });
  });

  it('should track the value after 0', () => {
    expect(Day17['_track'](3, 1)).toEqual(1);
    expect(Day17['_track'](3, 4)).toEqual(2);
    expect(Day17['_track'](3, 5)).toEqual(5);
    expect(Day17['_track'](3, 8)).toEqual(5);
    expect(Day17['_track'](3, 9)).toEqual(9);
  });
});
