import { describe, it, expect } from 'vitest';
import { Day04 } from '../solver.day-04';

describe('Day 4', () => {
  const example = `
aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa
`;

  const example2 = `
abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio
`;

  it('should parse the input', () => {
    const input = Day04.parseInput(example);
    expect(input).toHaveLength(3);
    expect(input.at(1)).toEqual(['aa', 'bb', 'cc', 'dd', 'aa']);
  });

  it('should identify invalid passphrases', () => {
    const input = Day04.parseInput(example);
    expect(Day04.isValid(input[0])).toBeTruthy();
    expect(Day04.isValid(input[1])).toBeFalsy();
    expect(Day04.isValid(input[2])).toBeTruthy();
  });

  it('should implement yet another policy', () => {
    const input = Day04.parseInput(example2);
    expect(Day04.anotherPolicy(input[0])).toBeTruthy();
    expect(Day04.anotherPolicy(input[1])).toBeFalsy();
    expect(Day04.anotherPolicy(input[2])).toBeTruthy();
    expect(Day04.anotherPolicy(input[3])).toBeTruthy();
    expect(Day04.anotherPolicy(input[4])).toBeFalsy();
  });
});
