import { describe, it, expect } from 'vitest';
import { Day06 } from '../solver.day-06';

describe('Day 6', () => {
  const example = '0 2 7 0';
  const answer = new Day06(example).solve();

  it('should detect the infinite loop', async () => {
    expect(await answer.partOne).toEqual('5');
  });

  it('should report the loop size', async () => {
    expect(await answer.partTwo).toEqual('4');
  });

  it('should redistribute blocks', () => {
    expect(Day06.redistribute([0, 2, 7, 0])).toEqual([2, 4, 1, 2]);
    expect(Day06.redistribute([2, 4, 1, 2])).toEqual([3, 1, 2, 3]);
    expect(Day06.redistribute([3, 1, 2, 3])).toEqual([0, 2, 3, 4]);
    expect(Day06.redistribute([0, 2, 3, 4])).toEqual([1, 3, 4, 1]);
    expect(Day06.redistribute([1, 3, 4, 1])).toEqual([2, 4, 1, 2]);
  });
});
