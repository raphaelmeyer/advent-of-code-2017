import { describe, it, expect } from 'vitest';
import { Day08 } from '../solver.day-08';

describe('Day 8', () => {
  const example = `
  b inc 5 if a > 1
  a inc 1 if b < 5
  c dec -10 if a >= 1
  c inc -20 if c == 10
`;
  const answer = new Day08(example).solve();

  it('should find the largest value in any register', async () => {
    expect(await answer.partOne).toEqual('1');
  });

  it('should find the largest value ever in any register', async () => {
    expect(await answer.partTwo).toEqual('10');
  });

  it('should parse the input', () => {
    const instructions = Day08.parseInput(example);

    expect(instructions).toHaveLength(4);

    expect(instructions.at(0)).toEqual(
      expect.objectContaining({
        reg: 'b',
        cond: expect.objectContaining({ reg: 'a' }),
      })
    );
    expect(instructions[0].ins(-3)).toEqual(2);
    expect(instructions[0].cond.cmp(1)).toBeFalsy();
    expect(instructions[0].cond.cmp(2)).toBeTruthy();

    expect(instructions.at(2)).toEqual(
      expect.objectContaining({
        reg: 'c',
        cond: expect.objectContaining({ reg: 'a' }),
      })
    );
    expect(instructions[2].ins(4)).toEqual(14);
    expect(instructions[2].cond.cmp(0)).toBeFalsy();
    expect(instructions[2].cond.cmp(1)).toBeTruthy();
  });
});
