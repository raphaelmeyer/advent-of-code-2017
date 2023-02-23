import { describe, it, expect } from 'vitest';
import { Day16 } from '../solver.day-16';

describe('Day 16', () => {
  const example = 's1,x3/4,pe/b';

  it('should parse the input', async () => {
    const input = Day16['_parseInput'](example);

    expect(input).toHaveLength(3);
    expect(input.at(0)).toEqual(
      expect.objectContaining({ move: 'spin', num: 1 })
    );
    expect(input.at(1)).toEqual(
      expect.objectContaining({ move: 'exchange', a: 3, b: 4 })
    );
    expect(input.at(2)).toEqual(
      expect.objectContaining({ move: 'partner', a: 'e', b: 'b' })
    );
  });

  describe('dancing', () => {
    it('should spin', () => {
      expect(
        Day16['_dance']('abcde'.split(''), { move: 'spin', num: 1 }).join('')
      ).toEqual('eabcd');
    });

    it('should exchange', () => {
      expect(
        Day16['_dance']('eabcd'.split(''), {
          move: 'exchange',
          a: 3,
          b: 4,
        }).join('')
      ).toEqual('eabdc');
    });

    it('should partner', () => {
      expect(
        Day16['_dance']('eabdc'.split(''), {
          move: 'partner',
          a: 'e',
          b: 'b',
        }).join('')
      ).toEqual('baedc');
    });
  });
});
