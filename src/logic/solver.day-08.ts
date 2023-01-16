import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Ins = (val: number) => number;
type Cmp = (val: number) => boolean;

interface Condition {
  cmp: Cmp;
  reg: string;
}

interface Instruction {
  ins: Ins;
  reg: string;
  cond: Condition;
}

const inc = (by: number) => (val: number) => val + by;
const dec = (by: number) => (val: number) => val - by;

const lt = (to: number) => (val: number) => val < to;
const le = (to: number) => (val: number) => val <= to;
const eq = (to: number) => (val: number) => val === to;
const ne = (to: number) => (val: number) => val !== to;
const ge = (to: number) => (val: number) => val >= to;
const gt = (to: number) => (val: number) => val > to;

type Registers = Map<string, number>;

export class Day08 implements PuzzleSolver {
  private _instructions: Instruction[];
  private _registers: Registers = new Map<string, number>();
  private _largest: number = 0;

  constructor(private _input: string) {
    this._instructions = Day08.parseInput(_input);
  }

  solve(): PuzzleAnswer {
    this._registers = this._evaluate();

    return {
      partOne: this._partOne(),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(): Promise<string> {
    let largest = 0;
    const values = this._registers.values();
    let value = values.next();
    while (!value.done) {
      if (value.value > largest) {
        largest = value.value;
      }
      value = values.next();
    }

    return Promise.resolve(largest.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve(this._largest.toString());
  }

  private _evaluate(): Registers {
    return this._instructions.reduce((regs, instruction) => {
      const from = regs.get(instruction.reg) ?? 0;
      const to = regs.get(instruction.cond.reg) ?? 0;

      if (instruction.cond.cmp(to)) {
        const updated = instruction.ins(from);
        if (updated > this._largest) {
          this._largest = updated;
        }
        regs.set(instruction.reg, updated);
      }

      return regs;
    }, new Map<string, number>());
  }

  public static parseInput(input: string): Instruction[] {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) => Day08._parseLine(line));
  }

  private static _parseLine(line: string): Instruction {
    const match = line.match(
      /(\w+) (inc|dec) (-?[0-9]+) if (\w+) (\S+) (-?[0-9]+)/
    );
    if (match) {
      return {
        ins: Day08._asIns(match.at(2) ?? '', parseInt(match.at(3) ?? '')),
        reg: match.at(1) ?? '',
        cond: {
          cmp: Day08._asCmp(match.at(5) ?? '', parseInt(match.at(6) ?? '')),
          reg: match.at(4) ?? '',
        },
      };
    }
    throw new Error(`could not match ${match}`);
  }

  private static _asCmp(op: string, to: number): Cmp {
    switch (op) {
      case '<':
        return lt(to);
      case '<=':
        return le(to);
      case '==':
        return eq(to);
      case '!=':
        return ne(to);
      case '>':
        return gt(to);
      case '>=':
        return ge(to);
      default:
        throw new Error(`no-op ${op}`);
    }
  }

  private static _asIns(ins: string, by: number) {
    switch (ins) {
      case 'inc':
        return inc(by);
      case 'dec':
        return dec(by);
      default:
        throw new Error(`not an ins ${ins}`);
    }
  }
}
