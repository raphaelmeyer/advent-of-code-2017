import { describe, it, expect } from 'vitest';
import { Day05 } from '../solver.day-05';

describe('Day 5', () => {
  const example = `
0
3
0
1
-3
`;

  it('should reach the exit', () => {
    expect(new Day05(example).partOne()).toEqual('5');
  });

  it('should reach the exit with stranger jumps', () => {
    expect(new Day05(example).partTwo()).toEqual('10');
  });
});
