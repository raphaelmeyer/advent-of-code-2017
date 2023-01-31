import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';
import { Day10 } from './solver.day-10';

export class Day14 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const input = this._input.trim();
    const rows: string[] = [];
    for (let i = 0; i < 128; i++) {
      const row = `${input}-${i}`;
      rows.push(Day10.knotHash(row));
    }

    return {
      partOne: this._partOne(rows),
      partTwo: this._partTwo(rows),
    };
  }

  private _partOne(rows: string[]): Promise<string> {
    const used = rows.reduce(
      (count, row) =>
        count +
        row.split('').reduce((c, nibble) => c + this._bitsInNibble(nibble), 0),
      0
    );

    return Promise.resolve(used.toString());
  }

  private _partTwo(rows: string[]): Promise<string> {
    const grid = rows.map((row) =>
      row
        .split('')
        .map((nibble) =>
          parseInt(nibble, 16).toString(2).padStart(4, '0').split('')
        )
        .flat(1)
    );

    let regions = 0;

    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        if (grid[y][x] === '1') {
          regions++;
          this._clearRegion(x, y, grid);
        }
      }
    }

    return Promise.resolve(regions.toString());
  }

  private _clearRegion(x: number, y: number, grid: string[][]): void {
    const queue: [number, number][] = [[x, y]];

    while (queue.length > 0) {
      const next = queue.pop();
      if (next === undefined) {
        return;
      }

      const [i, j] = next;
      grid[j][i] = '0';

      [
        [i, j - 1],
        [i, j + 1],
        [i - 1, j],
        [i + 1, j],
      ].forEach(([nx, ny]) => {
        if (0 <= nx && nx < 128 && 0 <= ny && ny < 128) {
          if (grid[ny][nx] === '1') {
            queue.push([nx, ny]);
          }
        }
      });
    }
  }

  private _bitsInNibble(nibble: string): number {
    switch (nibble) {
      case '1':
      case '2':
      case '4':
      case '8':
        return 1;

      case '3':
      case '5':
      case '6':
      case '9':
      case 'a':
      case 'c':
        return 2;

      case '7':
      case 'b':
      case 'd':
      case 'e':
        return 3;

      case 'f':
        return 4;

      default:
        return 0;
    }
  }
}
