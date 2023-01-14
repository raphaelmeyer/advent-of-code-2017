import { describe, it, expect } from 'vitest';
import { Day03 } from '../solver.day-03';

describe('Day 3', () => {
  it('should calculate the distance', async () => {
    expect(await new Day03('1').solve().partOne).toEqual('0');
    expect(await new Day03('12').solve().partOne).toEqual('3');
    expect(await new Day03('23').solve().partOne).toEqual('2');
    expect(await new Day03('1024').solve().partOne).toEqual('31');
  });

  it('should find the spiral sum bigger than given number', async () => {
    expect(await new Day03('1').solve().partTwo).toEqual('2');
    expect(await new Day03('10').solve().partTwo).toEqual('11');
    expect(await new Day03('20').solve().partTwo).toEqual('23');
    expect(await new Day03('746').solve().partTwo).toEqual('747');
    expect(await new Day03('747').solve().partTwo).toEqual('806');
  });
});
