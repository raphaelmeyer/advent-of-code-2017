import { describe, it, expect } from 'vitest';
import { Day18 } from '../solver.day-18';

const example = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`;

const example2 = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d
`;

describe('Day 18', () => {
  it('should recover the frequency', async () => {
    const instructions = Day18['_parseInput'](example);
    const solver = new Day18(example);
    const answer = await solver['_partOne'](instructions);
    expect(answer).toEqual('4');
  });

  it('should count sends of program 1', async () => {
    const instructions = Day18['_parseInput'](example2);
    const solver = new Day18(example);
    const answer = await solver['_partTwo'](instructions);
    expect(answer).toEqual('3');
  });

  it('should parse the input', () => {
    const instructions = Day18['_parseInput'](example);

    expect(instructions.length).toEqual(10);

    expect(instructions.at(0)).toEqual(
      expect.objectContaining({
        ins: 'set',
        x: { type: 'reg', name: 'a' },
        y: { type: 'val', val: 1 },
      })
    );
    expect(instructions.at(4)).toEqual(
      expect.objectContaining({ ins: 'snd', x: { type: 'reg', name: 'a' } })
    );
  });

  it('should parse instructions', () => {
    expect(Day18['_parseInstruction']('snd f')).toEqual(
      expect.objectContaining({ ins: 'snd', x: { type: 'reg', name: 'f' } })
    );

    expect(Day18['_parseInstruction']('set q w')).toEqual(
      expect.objectContaining({
        ins: 'set',
        x: { type: 'reg', name: 'q' },
        y: { type: 'reg', name: 'w' },
      })
    );
    expect(Day18['_parseInstruction']('set e 12')).toEqual(
      expect.objectContaining({
        ins: 'set',
        x: { type: 'reg', name: 'e' },
        y: { type: 'val', val: 12 },
      })
    );

    expect(Day18['_parseInstruction']('add r -3')).toEqual(
      expect.objectContaining({
        ins: 'add',
        x: { type: 'reg', name: 'r' },
        y: { type: 'val', val: -3 },
      })
    );

    expect(Day18['_parseInstruction']('mul t y')).toEqual(
      expect.objectContaining({
        ins: 'mul',
        x: { type: 'reg', name: 't' },
        y: { type: 'reg', name: 'y' },
      })
    );

    expect(Day18['_parseInstruction']('mod u 34')).toEqual(
      expect.objectContaining({
        ins: 'mod',
        x: { type: 'reg', name: 'u' },
        y: { type: 'val', val: 34 },
      })
    );

    expect(Day18['_parseInstruction']('rcv a')).toEqual(
      expect.objectContaining({ ins: 'rcv', x: { type: 'reg', name: 'a' } })
    );

    expect(Day18['_parseInstruction']('jgz i -4')).toEqual(
      expect.objectContaining({
        ins: 'jgz',
        x: { type: 'reg', name: 'i' },
        y: { type: 'val', val: -4 },
      })
    );
  });
});
