import { describe, it, expect } from 'vitest';
import { Day01 } from '../solver.day-01';

describe('Day 1', () => {
  it('should calculate reverse captcha', () => {
    const solver = new Day01('1122');
    expect(solver.partOne()).toEqual('3');
    expect(solver.partTwo()).toEqual('0');
  });
});
