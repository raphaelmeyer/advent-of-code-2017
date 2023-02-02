import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

interface G {
  a: number;
  b: number;
}

export class Day15 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const start = Day15.parseInput(this._input);

    return {
      partOne: this._partOne(start),
      partTwo: this._partTwo(start),
    };
  }

  public static parseInput(input: string): G {
    const trimmed = input
      .trim()
      .split('\n')
      .filter((line) => line);
    const a = trimmed[0].match(/^Generator A starts with (\d+)$/);
    const b = trimmed[1].match(/^Generator B starts with (\d+)$/);

    return { a: parseInt(a?.at(1) ?? ''), b: parseInt(b?.at(1) ?? '') };
  }

  private _partOne(start: G): Promise<string> {
    let count = 0;
    const g = { ...start };
    for (let i = 0; i < 40 * 1000 * 1000; i++) {
      g.a = (g.a * 16807) % 2147483647;
      g.b = (g.b * 48271) % 2147483647;
      if ((g.a & 0xffff) === (g.b & 0xffff)) {
        count++;
      }
    }
    return Promise.resolve(count.toString());
  }

  private _partTwo(start: G): Promise<string> {
    let count = 0;
    const g = { ...start };
    for (let i = 0; i < 5 * 1000 * 1000; i++) {
      g.a = (g.a * 16807) % 2147483647;
      while (g.a & 3) {
        g.a = (g.a * 16807) % 2147483647;
      }

      g.b = (g.b * 48271) % 2147483647;
      while (g.b & 7) {
        g.b = (g.b * 48271) % 2147483647;
      }

      if ((g.a & 0xffff) === (g.b & 0xffff)) {
        count++;
      }
    }
    return Promise.resolve(count.toString());
  }
}
