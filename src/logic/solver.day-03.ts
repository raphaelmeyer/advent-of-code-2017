import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

interface Pos {
  x: number;
  y: number;
  s: number;
}

type Direction = 'right' | 'up' | 'left' | 'down';

export class Day03 implements PuzzleSolver {
  constructor(private _input: string) {}

  public solve(): PuzzleAnswer {
    const value = parseInt(this._input);
    return {
      partOne: this._partOne(value),
      partTwo: this._partTwo(value),
    };
  }

  private _partOne(value: number): Promise<string> {
    if (value === 1) {
      return Promise.resolve('0');
    }

    let i = 1;
    while (value > i * i) {
      i = i + 2;
    }

    const j = i - 1;
    const a = (value - 1) % j;
    const b = a < j / 2 ? j - a : a;

    return Promise.resolve(b.toString());
  }

  private _partTwo(value: number): Promise<string> {
    let off = 2;
    let dir: Direction = 'right';
    let count = 1;

    const current: Pos = { x: 0, y: 0, s: 1 };
    const spiral: Pos[] = [{ ...current }];

    while (current.s <= value) {
      this._move(current, dir);

      current.s = this._spiralSum(current, spiral);
      spiral.push({ ...current });

      count--;
      if (count <= 0) {
        [dir, count, off] = this._turn(dir, count, off);
      }
    }

    return Promise.resolve(current.s.toString());
  }

  private _move(current: Pos, dir: Direction) {
    switch (dir) {
      case 'right':
        current.x += 1;
        break;
      case 'up':
        current.y -= 1;
        break;
      case 'left':
        current.x -= 1;
        break;
      case 'down':
        current.y += 1;
        break;
    }
  }

  private _turn(
    dir: Direction,
    count: number,
    off: number
  ): [Direction, number, number] {
    switch (dir) {
      case 'right':
        count = off - 1;
        dir = 'up';
        break;
      case 'up':
        count = off;
        dir = 'left';
        break;
      case 'left':
        count = off;
        dir = 'down';
        break;
      case 'down':
        off = off + 2;
        count = off - 1;
        dir = 'right';
        break;
    }
    return [dir, count, off];
  }

  private _spiralSum(current: Pos, spiral: Pos[]): number {
    const adj: { x: number; y: number }[] = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ];

    const neighbors = adj.map((a) => ({
      x: a.x + current.x,
      y: a.y + current.y,
    }));

    return neighbors.reduce((sum, n) => {
      const p = spiral.find((p) => n.x === p.x && n.y === p.y);
      return sum + (p?.s ?? 0);
    }, 0);
  }
}
