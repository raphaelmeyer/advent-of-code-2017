import { describe, it, expect } from 'vitest';
import { Day19 } from '../solver.day-19';

const example = `
     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`;

describe('Day 19', () => {
  it('should find its way through tubes', async () => {
    const answer = new Day19(example).solve();
    expect(await answer.partOne).toEqual('ABCDEF');
  });

  it('should count the steps', async () => {
    const answer = new Day19(example).solve();
    expect(await answer.partTwo).toEqual('38');
  });

  it('should parse the input', () => {
    const maze = Day19['_parseInput'](example);

    expect(maze.length).toEqual(6);
    expect(maze.at(0)).toStrictEqual('     |          ');
    expect(maze.at(4)).toStrictEqual('     |  |  |  D ');
  });
});
