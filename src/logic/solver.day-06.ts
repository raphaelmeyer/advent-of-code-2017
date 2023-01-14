import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day06 implements PuzzleSolver {
  constructor(private _input: string) {}

  public solve(): PuzzleAnswer {
    const banks = this._input
      .split(/\s+/)
      .filter((w) => w.trim())
      .map((w) => parseInt(w));

    const memory: number[][] = [];
    let next = banks;

    while (!memory.find((b) => this.compare(b, next))) {
      memory.push(next);
      next = Day06.redistribute(next);
    }

    return {
      partOne: this._partOne(memory),
      partTwo: this._partTwo(memory, next),
    };
  }

  private _partOne(memory: number[][]): Promise<string> {
    return Promise.resolve(memory.length.toString());
  }

  private _partTwo(memory: number[][], last: number[]): Promise<string> {
    const start = memory.findIndex((b) => this.compare(b, last));
    return Promise.resolve((memory.length - start).toString());
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
