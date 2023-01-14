import { describe, it, expect } from 'vitest';
import { Day01 } from '../solver.day-01';

describe('Day 1', () => {
  it('should calculate reverse captcha', async () => {
    const answer = new Day01('1122').solve();

    expect(await answer.partOne).toEqual('3');
    expect(await answer.partTwo).toEqual('0');
  });
});
