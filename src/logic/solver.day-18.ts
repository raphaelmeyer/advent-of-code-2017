import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Register = { type: 'reg'; name: string };
type Value = Register | { type: 'val'; val: number };

type Instruction =
  | { ins: 'snd'; x: Value }
  | { ins: 'set'; x: Register; y: Value }
  | { ins: 'add'; x: Register; y: Value }
  | { ins: 'mul'; x: Register; y: Value }
  | { ins: 'mod'; x: Register; y: Value }
  | { ins: 'rcv'; x: Register }
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

type Regs = Map<string, number>;

interface State {
  pc: number;
  in: number[];
  out: number[];
  regs: Regs;
  snd: number;
}

class Executor2 {
  private _q0to1: number[] = [];
  private _q1to0: number[] = [];
  private _p0: State = {
    pc: 0,
    in: this._q1to0,
    out: this._q0to1,
    regs: new Map(),
    snd: 0,
  };
  private _p1: State = {
    pc: 0,
    in: this._q0to1,
    out: this._q1to0,
    regs: new Map(),
    snd: 0,
  };

  public constructor(private _instructions: Instruction[]) {}

  public run(): number {
    this._p0.regs.set('p', 0);
    this._p1.regs.set('p', 1);
    for (;;) {
      this._p0 = this._exec(this._p0);
      this._p1 = this._exec(this._p1);

      if (this._deadlock()) {
        return this._p1.snd;
      }
    }
  }

  private _exec(p: State): State {
    const ins = this._instructions.at(p.pc);
    if (ins === undefined) {
      throw new Error('SEGV');
    }

    switch (ins.ins) {
      case 'snd':
        p.out.push(this._value(p.regs, ins.x));
        p.snd++;
        p.pc++;
        break;

      case 'set':
        this._store(p.regs, ins.x, this._value(p.regs, ins.y));
        p.pc++;
        break;

      case 'add':
        this._store(
          p.regs,
          ins.x,
          this._value(p.regs, ins.x) + this._value(p.regs, ins.y)
        );
        p.pc++;
        break;

      case 'mul':
        this._store(
          p.regs,
          ins.x,
          this._value(p.regs, ins.x) * this._value(p.regs, ins.y)
        );
        p.pc++;
        break;

      case 'mod':
        this._store(
          p.regs,
          ins.x,
          this._value(p.regs, ins.x) % this._value(p.regs, ins.y)
        );
        p.pc++;
        break;

      case 'rcv':
        {
          if (p.in.length > 0) {
            this._store(p.regs, ins.x, p.in.shift() ?? 0);
            p.pc++;
          }
        }
        break;

      case 'jgz':
        p.pc =
          p.pc +
          (this._value(p.regs, ins.x) > 0 ? this._value(p.regs, ins.y) : 1);
        break;
    }

    return p;
  }

  private _value(r: Regs, v: Value): number {
    switch (v.type) {
      case 'val':
        return v.val;
      case 'reg':
        return r.get(v.name) ?? 0;
    }
  }

  private _store(r: Regs, dst: Register, value: number) {
    r.set(dst.name, value);
  }
  private _deadlock(): boolean {
    return (
      this._instructions.at(this._p0.pc)?.ins === 'rcv' &&
      this._p0.in.length === 0 &&
      this._instructions.at(this._p1.pc)?.ins === 'rcv' &&
      this._p1.in.length === 0
    );
  }
}

export class Day18 implements PuzzleSolver {
  public constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const instructions = Day18._parseInput(this._input);

    return {
      partOne: this._partOne(instructions),
      partTwo: this._partTwo(instructions),
    };
  }

  private _partOne(instructions: Instruction[]): Promise<string> {
    const exe = new Executor(instructions);
    const result = exe.recover();

    return Promise.resolve(result.toString());
  }

  private _partTwo(instructions: Instruction[]): Promise<string> {
    const exe = new Executor2(instructions);
    const result = exe.run();

    return Promise.resolve(result.toString());
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
        return { ins: 'rcv', x: Day18._register(x) };

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
