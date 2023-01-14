import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day05 implements PuzzleSolver {
  public constructor(private _input: string) {}

  public solve(): PuzzleAnswer {
    const offsets = this._parseInput(this._input);
    return {
      partOne: this._partOne(offsets),
      partTwo: this._partTwo(offsets),
    };
  }

  private _partOne(offsets: number[]): Promise<string> {
    const maze = [...offsets];
    let pc = 0;
    let n = 0;
    while (0 <= pc && pc < maze.length) {
      const old = pc;
      pc = maze[old] + pc;
      maze[old]++;
      n++;
    }
    return Promise.resolve(n.toString());
  }

  public _partTwo(offsets: number[]): Promise<string> {
    const maze = [...offsets];
    let pc = 0;
    let n = 0;
    while (0 <= pc && pc < maze.length) {
      const old = pc;
      const offset = maze[old];
      pc = maze[old] + pc;
      maze[old] = offset >= 3 ? offset - 1 : offset + 1;
      n++;
    }
    return Promise.resolve(n.toString());
  }

  private _parseInput(input: string): number[] {
    return input
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => parseInt(line));
  }
}
