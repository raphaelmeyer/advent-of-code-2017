import { describe, it, expect } from 'vitest';
import { Day09 } from '../solver.day-09';

describe('Day 9', () => {
  it.each<{ input: string; score: number }>([
    { input: '{}', score: 1 },
    { input: '{{{}}}', score: 6 },
    { input: '{{},{}}', score: 5 },
    { input: '{{{},{},{{}}}}', score: 16 },
    { input: '{<a>,<a>,<a>,<a>}', score: 1 },
    { input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', score: 9 },
    { input: '{{<!!>},{<!!>},{<!!>},{<!!>}},', score: 9 },
    { input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', score: 3 },
  ])(
    'should calculate score of $score for $input',
    async ({ input, score }) => {
      const answer = new Day09(input).solve();
      expect(await answer.partOne).toEqual(score.toString());
    }
  );

  it.each<{ input: string; garbage: number }>([
    { input: '{{{},{},{{}}}}', garbage: 0 },
    { input: '{<a>,<a>,<a>,<a>}', garbage: 4 },
    { input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', garbage: 8 },
    { input: '{{<!!>},{<!!>},{<!!>},{<!!>}},', garbage: 0 },
    { input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', garbage: 17 },
  ])(
    'should count $garbage garbage characters in $input',
    async ({ input, garbage }) => {
      const answer = new Day09(input).solve();
      expect(await answer.partTwo).toEqual(garbage.toString());
    }
  );
});
