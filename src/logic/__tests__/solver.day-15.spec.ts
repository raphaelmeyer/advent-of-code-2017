import { describe, it, expect } from 'vitest';
import { Day15 } from '../solver.day-15';

const example = `
Generator A starts with 65
Generator B starts with 8921
`;

describe('Day 15', () => {
  it('should count matching pairs', async () => {
    const answer = new Day15(example).solve();
    expect(await answer.partOne).toEqual('588');
  });

  it('should count picky matching pairs', async () => {
    const answer = new Day15(example).solve();
    expect(await answer.partTwo).toEqual('309');
  });

  it('should parse the input', () => {
    const start = Day15.parseInput(example);
    expect(start).toEqual({ a: 65, b: 8921 });
  });

  it('should correctly do integer calculations', () => {
    expect((65 * 16807) % 2147483647).toEqual(1092455);
    expect((1092455 * 16807) % 2147483647).toEqual(1181022009);
    expect((1181022009 * 16807) % 2147483647).toEqual(245556042);
    expect((245556042 * 16807) % 2147483647).toEqual(1744312007);
    expect((1744312007 * 16807) % 2147483647).toEqual(1352636452);

    expect((8921 * 48271) % 2147483647).toEqual(430625591);
    expect((430625591 * 48271) % 2147483647).toEqual(1233683848);
    expect((1233683848 * 48271) % 2147483647).toEqual(1431495498);
    expect((1431495498 * 48271) % 2147483647).toEqual(137874439);
    expect((137874439 * 48271) % 2147483647).toEqual(285222916);
  });
});
