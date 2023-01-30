import { describe, it, expect } from 'vitest';
import { Day14 } from '../solver.day-14';

describe('Day 14', () => {
  it('should count how many squares are used', async () => {
    const answer = new Day14('flqrgnkx').solve();
    expect(await answer.partOne).toEqual('8108');
  });
});
