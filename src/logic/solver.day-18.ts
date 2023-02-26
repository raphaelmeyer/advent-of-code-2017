import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Register = { type: 'reg'; name: string };
type Value = Register | { type: 'val'; val: number };

type Instruction =
  | { ins: 'snd'; x: Value }
  | { ins: 'set'; x: Register; y: Value }
  | { ins: 'add'; x: Register; y: Value }
  | { ins: 'mul'; x: Register; y: Value }
  | { ins: 'mod'; x: Register; y: Value }
  | { ins: 'rcv'; x: Value }
  | { ins: 'jgz'; x: Value; y: Value };

const reRegister = /[a-z]/;
const reNumber = /-?\d+/;

class Executor {
  private _freq = 0;
  private _pc = 0;
  private _regs: Map<string, number> = new Map();

  public constructor(private _instructions: Instruction[]) {}

  public recover(): number {
    for (;;) {
      const ins = this._instructions.at(this._pc);
      if (ins === undefined) {
        throw new Error('SEGV');
      }

      if (ins.ins === 'rcv' && this._value(ins.x) !== 0) {
        return this._freq;
      }

      this._exec(ins);
    }
  }

  private _exec(ins: Instruction): void {
    switch (ins.ins) {
      case 'snd':
        this._freq = this._value(ins.x);
        this._pc++;
        break;

      case 'set':
        this._store(ins.x, this._value(ins.y));
        this._pc++;
        break;

      case 'add':
        this._store(ins.x, this._value(ins.x) + this._value(ins.y));
        this._pc++;
        break;

      case 'mul':
        this._store(ins.x, this._value(ins.x) * this._value(ins.y));
        this._pc++;
        break;

      case 'mod':
        this._store(ins.x, this._value(ins.x) % this._value(ins.y));
        this._pc++;
        break;

      case 'rcv':
        this._pc++;
        break;

      case 'jgz':
        this._pc = this._pc + (this._value(ins.x) > 0 ? this._value(ins.y) : 1);
        break;
    }
  }

  private _value(v: Value): number {
    switch (v.type) {
      case 'val':
        return v.val;
      case 'reg':
        return this._regs.get(v.name) ?? 0;
    }
  }

  private _store(dst: Register, value: number) {
    this._regs.set(dst.name, value);
  }
}

export class Day18 implements PuzzleSolver {
  public constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const instructions = Day18._parseInput(this._input);

    return {
      partOne: this._partOne(instructions),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(instructions: Instruction[]): Promise<string> {
    const exe = new Executor(instructions);
    const result = exe.recover();

    return Promise.resolve(result.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve('🎄');
  }

  private static _parseInput(input: string): Instruction[] {
    return input
      .split('\n')
      .filter((line) => line)
      .map((line) => Day18._parseInstruction(line));
  }

  private static _parseInstruction(line: string): Instruction {
    const tokens = line.split(' ');
    const ins = tokens.at(0);
    const x = tokens.at(1) ?? '';
    const y = tokens.at(2) ?? '';

    switch (ins) {
      case 'snd':
        return { ins: 'snd', x: Day18._value(x) };

      case 'set':
        return { ins: 'set', x: Day18._register(x), y: Day18._value(y) };

      case 'add':
        return { ins: 'add', x: Day18._register(x), y: Day18._value(y) };

      case 'mul':
        return { ins: 'mul', x: Day18._register(x), y: Day18._value(y) };

      case 'mod':
        return { ins: 'mod', x: Day18._register(x), y: Day18._value(y) };

      case 'rcv':
        return { ins: 'rcv', x: Day18._value(x) };

      case 'jgz':
        return { ins: 'jgz', x: Day18._value(x), y: Day18._value(y) };

      default:
        break;
    }

    throw new Error(`could not parse '${line}'`);
  }

  private static _register(token: string): Register {
    if (token.match(reRegister)) {
      return { type: 'reg', name: token };
    }
    throw new Error(`token '${token} is not a register`);
  }

  private static _value(token: string): Value {
    if (token.match(reRegister)) {
      return { type: 'reg', name: token };
    } else if (token.match(reNumber)) {
      return { type: 'val', val: parseInt(token) };
    }
    throw new Error(`token '${token} is not a register or value`);
  }
}
