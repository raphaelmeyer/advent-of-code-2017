import { describe, it, expect } from 'vitest';
import { Day02 } from '../solver.day-02';

describe('Day 1', () => {
  const example = `5  1  9  5
                   7  5  3
                   2  4  6  8
`;

  const example2 = `5 9 2 8
                    9 4 7 3
                    3 8 6 5
`;

  it('should calculate the checksum', () => {
    const solver = new Day02(example);
    expect(solver.partOne()).toEqual('18');
  });

  it('should calculate the difference of row', () => {
    expect(Day02.difference([5, 1, 9, 5])).toStrictEqual(8);
    expect(Day02.difference([7, 5, 3])).toStrictEqual(4);
    expect(Day02.difference([2, 4, 6, 8])).toStrictEqual(6);
  });

  it('should calculate the evenly divisible values', () => {
    const solver = new Day02(example2);
    expect(solver.partTwo()).toEqual('9');
  });

  it('should find evenly divisible values', () => {
    expect(Day02.evenly([5, 9, 2, 8])).toStrictEqual(4);
    expect(Day02.evenly([9, 4, 7, 3])).toStrictEqual(3);
    expect(Day02.evenly([3, 8, 6, 5])).toStrictEqual(2);
  });

  it('should parse the input', () => {
    const parsed = Day02.parseInput(example);

    expect(parsed.length).toStrictEqual(3);
    expect(parsed.at(1)).toStrictEqual([7, 5, 3]);
  });
});
