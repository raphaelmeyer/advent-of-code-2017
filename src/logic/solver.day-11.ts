import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Direction = 'n' | 'ne' | 'se' | 's' | 'sw' | 'nw';

interface Position {
  q: number;
  r: number;
}

export class Day11 implements PuzzleSolver {
  private _walked: { distance: number; max: number } = { distance: 0, max: 0 };

  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const path = Day11.parseInput(this._input);
    this._walked = Day11.walk(path);

    return {
      partOne: this._partOne(),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(): Promise<string> {
    return Promise.resolve(this._walked.distance.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve(this._walked.max.toString());
  }

  public static parseInput(input: string): Direction[] {
    return input
      .trim()
      .split(',')
      .map((d) => Day11._asDirection(d));
  }

  public static walk(path: Direction[]): { distance: number; max: number } {
    const step = (pos: Position, d: Direction) => {
      switch (d) {
        case 'n':
          return { q: pos.q, r: pos.r - 1 };
        case 'ne':
          return { q: pos.q + 1, r: pos.r - 1 };
        case 'se':
          return { q: pos.q + 1, r: pos.r };
        case 's':
          return { q: pos.q, r: pos.r + 1 };
        case 'sw':
          return { q: pos.q - 1, r: pos.r + 1 };
        case 'nw':
          return { q: pos.q - 1, r: pos.r };
      }
    };

    const walked = path.reduce(
      (acc, d) => {
        const next = step(acc.pos, d);
        const dist = Day11.distance(next);
        return { pos: next, max: dist > acc.max ? dist : acc.max };
      },
      { pos: { q: 0, r: 0 }, max: 0 }
    );

    return { distance: Day11.distance(walked.pos), max: walked.max };
  }

  public static distance(pos: Position): number {
    return (Math.abs(pos.q) + Math.abs(pos.q + pos.r) + Math.abs(pos.r)) / 2;
  }

  private static _asDirection(d: string): Direction {
    switch (d) {
      case 'n':
        return 'n';
      case 'ne':
        return 'ne';
      case 'nw':
        return 'nw';
      case 's':
        return 's';
      case 'se':
        return 'se';
      case 'sw':
        return 'sw';

      default:
        throw new Error(`invalid token ${d}`);
    }
  }
}
