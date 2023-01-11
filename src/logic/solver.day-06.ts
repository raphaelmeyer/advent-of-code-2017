import type { PuzzleSolver } from '@/models/puzzle.types';

export class Day06 implements PuzzleSolver {
  private _banks: number[];

  constructor(private _input: string) {
    this._banks = _input
      .split(/\s+/)
      .filter((w) => w.trim())
      .map((w) => parseInt(w));
  }

  public partOne(): string {
    const memory: number[][] = [];
    let next = this._banks;

    while (!memory.find((b) => this.compare(b, next))) {
      memory.push(next);
      next = Day06.redistribute(next);
    }

    return memory.length.toString();
  }

  public partTwo(): string {
    const memory: number[][] = [];
    let next = this._banks;

    while (!memory.find((b) => this.compare(b, next))) {
      memory.push(next);
      next = Day06.redistribute(next);
    }

    const start = memory.findIndex((b) => this.compare(b, next));
    return (memory.length - start).toString();
  }

  public static redistribute(banks: number[]): number[] {
    const redist = [...banks];

    const [bank, blocks] = banks.reduce(
      ([i, b], blocks, index) => {
        if (blocks > b) {
          return [index, blocks];
        }
        return [i, b];
      },
      [0, 0]
    );

    redist[bank] = 0;
    const add = Math.floor(blocks / banks.length);
    const rem = blocks % banks.length;

    for (let i = 0; i < banks.length; i++) {
      const index = (i + 1 + bank) % banks.length;
      redist[index] += i < rem ? add + 1 : add;
    }

    return redist;
  }

  private compare(a: number[], b: number[]): boolean {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((v, i) => v === b[i]);
  }
}
