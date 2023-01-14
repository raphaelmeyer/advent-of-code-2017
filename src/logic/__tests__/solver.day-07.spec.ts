import { describe, it, expect } from 'vitest';
import { Day07 } from '../solver.day-07';

describe('Day 7', () => {
  const example = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`;

  it('should parse the input', () => {
    const tower = Day07.parseInput(example);

    expect(tower.get('pbga')).toEqual({ weight: 66, subs: [] });
    expect(tower.get('ktlj')).toEqual({ weight: 57, subs: [] });
    expect(tower.get('padx')).toEqual({
      weight: 45,
      subs: ['pbga', 'havc', 'qoyq'],
    });
  });

  describe('Answer', () => {
    const answer = new Day07(example).solve();
    it('should find the bottom program', async () => {
      expect(await answer.partOne).toEqual('tknk');
    });

    it('should find weight to balance the entire tower', async () => {
      expect(await answer.partTwo).toEqual('60');
    });
  });
});
