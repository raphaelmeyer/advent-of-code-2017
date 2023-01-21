import { describe, it, expect } from 'vitest';
import { Day11 } from '../solver.day-11';

describe('Day 11', () => {
  it.each<{ input: string; distance: number }>([
    { input: 'ne,ne,ne', distance: 3 },
    { input: 'ne,ne,sw,sw', distance: 0 },
    { input: 'ne,ne,s,s', distance: 2 },
    { input: 'se,sw,se,sw,sw', distance: 3 },
  ])('should find distance for $input', async ({ input, distance }) => {
    const answer = new Day11(input).solve();
    expect(await answer.partOne).toEqual(distance.toString());
  });

  it.each<{ input: string; max: number }>([
    { input: 'ne,ne,ne', max: 3 },
    { input: 'ne,ne,sw,sw', max: 2 },
    { input: 'ne,ne,s,s', max: 2 },
  ])('should find max distance for $input', async ({ input, max }) => {
    const answer = new Day11(input).solve();
    expect(await answer.partTwo).toEqual(max.toString());
  });

  it('should parse the input', () => {
    expect(Day11.parseInput('n,sw,ne,s,se,nw')).toEqual([
      'n',
      'sw',
      'ne',
      's',
      'se',
      'nw',
    ]);
  });
});
