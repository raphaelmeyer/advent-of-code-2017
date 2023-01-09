import { describe, it, expect } from 'vitest';
import { Day03 } from '../solver.day-03';

describe('Day 3', () => {
  it('should calculate the distance', () => {
    expect(new Day03('1').partOne()).toEqual('0');
    expect(new Day03('12').partOne()).toEqual('3');
    expect(new Day03('23').partOne()).toEqual('2');
    expect(new Day03('1024').partOne()).toEqual('31');
  });

  it('should find the spiral sum bigger than given number', () => {
    expect(new Day03('1').partTwo()).toEqual('2');
    expect(new Day03('10').partTwo()).toEqual('11');
    expect(new Day03('20').partTwo()).toEqual('23');
    expect(new Day03('746').partTwo()).toEqual('747');
    expect(new Day03('747').partTwo()).toEqual('806');
  });
});
