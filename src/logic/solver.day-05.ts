import type { PuzzleSolver } from '@/models/puzzle.types';

export class Day05 implements PuzzleSolver {
  private _offsets: number[];
  public constructor(private _input: string) {
    this._offsets = this._parseInput(_input);
  }

  public partOne(): string {
    const maze = [...this._offsets];
    let pc = 0;
    let n = 0;
    while (0 <= pc && pc < maze.length) {
      const old = pc;
      pc = maze[old] + pc;
      maze[old]++;
      n++;
    }
    return n.toString();
  }

  public partTwo(): string {
    const maze = [...this._offsets];
    let pc = 0;
    let n = 0;
    while (0 <= pc && pc < maze.length) {
      const old = pc;
      const offset = maze[old];
      pc = maze[old] + pc;
      maze[old] = offset >= 3 ? offset - 1 : offset + 1;
      n++;
    }
    return n.toString();
  }

  private _parseInput(input: string): number[] {
    return input
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => parseInt(line));
  }
}
