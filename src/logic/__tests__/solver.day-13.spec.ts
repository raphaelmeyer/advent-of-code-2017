import { describe, it, expect } from 'vitest';
import { Day13 } from '../solver.day-13';

describe('Day 13', () => {
  const example = `
0: 3
1: 2
4: 4
6: 4
`;

  it('should determine severity of trip if you leave immediately', async () => {
    const answer = new Day13(example).solve();
    expect(await answer.partOne).toEqual('24');
  });

  it('should find smallest delay to get through safely', async () => {
    const answer = new Day13(example).solve();
    expect(await answer.partTwo).toEqual('10');
  });
});
