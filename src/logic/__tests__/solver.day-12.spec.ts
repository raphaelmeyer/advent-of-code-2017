import { describe, it, expect } from 'vitest';
import { Day12 } from '../solver.day-12';

describe('Day 12', () => {
  const example = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`;

  it('should determine many how programs are in the group that contains program ID 0', async () => {
    const answer = new Day12(example).solve();
    expect(await answer.partOne).toEqual('6');
  });

  it('should determine many groups are there in total', async () => {
    const answer = new Day12(example).solve();
    expect(await answer.partTwo).toEqual('2');
  });
});
