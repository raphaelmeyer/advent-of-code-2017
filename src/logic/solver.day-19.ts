import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Direction = 'up' | 'down' | 'left' | 'right';

export class Day19 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const maze = Day19._parseInput(this._input);
    const [letters, steps] = this._walk(maze);

    return {
      partOne: this._partOne(letters),
      partTwo: this._partTwo(steps),
    };
  }

  private _partOne(letters: string): Promise<string> {
    return Promise.resolve(letters);
  }

  private _partTwo(steps: number): Promise<string> {
    return Promise.resolve(steps.toString());
  }

  private static _parseInput(input: string): string[] {
    return input.split('\n').filter((line) => line.trim());
  }

  private _abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  private _walk(maze: string[]): [string, number] {
    let x = maze.at(0)?.indexOf('|') ?? 0;
    let y = 0;
    let dir: Direction = 'down';
    let letters = '';
    let steps = 0;

    for (;;) {
      const t = maze.at(y)?.at(x) ?? '';
      if (t === ' ') {
        return [letters, steps];
      } else if (this._abc.includes(t)) {
        letters = letters.concat(t);
        [x, y] = this._step(x, y, dir);
      } else if (t === '|' || t === '-') {
        [x, y] = this._step(x, y, dir);
      } else if (t === '+') {
        if (dir === 'down' || dir === 'up') {
          [x, y, dir] = this._lookLeftRight(maze, x, y);
        } else {
          [x, y, dir] = this._lookUpDown(maze, x, y);
        }
      }
      steps++;
    }
  }

  private _step(x: number, y: number, dir: Direction): [number, number] {
    switch (dir) {
      case 'down':
        return [x, y + 1];
      case 'up':
        return [x, y - 1];
      case 'left':
        return [x - 1, y];
      case 'right':
        return [x + 1, y];
    }
  }

  private _lookLeftRight(
    maze: string[],
    x: number,
    y: number
  ): [number, number, Direction] {
    if (x > 0) {
      const t = maze.at(y)?.at(x - 1) ?? '';
      if (t === '-' || this._abc.includes(t)) {
        return [x - 1, y, 'left'];
      }
    }

    const t = maze.at(y)?.at(x + 1) ?? '';
    if (t === '-' || this._abc.includes(t)) {
      return [x + 1, y, 'right'];
    }

    throw new Error(`lost at [${x},${y}]`);
  }

  private _lookUpDown(
    maze: string[],
    x: number,
    y: number
  ): [number, number, Direction] {
    if (y > 0) {
      const t = maze.at(y - 1)?.at(x) ?? '';
      if (t === '|' || this._abc.includes(t)) {
        return [x, y - 1, 'up'];
      }
    }

    const t = maze.at(y + 1)?.at(x) ?? '';
    if (t === '|' || this._abc.includes(t)) {
      return [x, y + 1, 'down'];
    }

    throw new Error(`lost at [${x},${y}]`);
  }
}
