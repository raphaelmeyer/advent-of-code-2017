import { describe, it, expect } from 'vitest';
import { Day10 } from '../solver.day-10';

describe('Day 10', () => {
  const example = '3, 4, 1, 5';

  it('should knot hashes', async () => {
    const lengths = Day10.parseInput(example);
    const knoted = Day10.knot(lengths, 5);

    expect(knoted).toEqual([3, 4, 2, 1, 0]);
  });

  it.each<{ input: string; hash: string }>([
    { input: '', hash: 'a2582a3a0e66e6e86e3812dcb672a272' },
    { input: 'AoC 2017', hash: '33efeb34ea91902bb2f59c9920caa6cd' },
    { input: '1,2,3', hash: '3efbe78a8d82f29979031a4aa0b16a9d' },
    { input: '1,2,4', hash: '63960835bcdc130f0b66d7ff4f6a5a8e' },
  ])('should calculate hash for $input', async ({ input, hash }) => {
    const answer = new Day10(input).solve();
    expect(await answer.partTwo).toEqual(hash);
  });
});
