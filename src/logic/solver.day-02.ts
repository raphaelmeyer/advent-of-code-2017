import type { PuzzleSolver } from '@/models/puzzle.types';

export class Day02 implements PuzzleSolver {
  _rows: number[][] = [];

  constructor(private _input: string) {
    this._rows = Day02.parseInput(_input);
  }

  public partOne(): string {
    const checksum = this._rows.reduce(
      (sum, row) => sum + Day02.difference(row),
      0
    );
    return checksum.toString();
  }

  public partTwo(): string {
    const divsum = this._rows.reduce((sum, row) => sum + Day02.evenly(row), 0);
    return divsum.toString();
  }

  public static parseInput(input: string): number[][] {
    return input
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        return line
          .trim()
          .split(/\s+/)
          .map((n) => parseInt(n));
      });
  }

  public static difference(row: number[]): number {
    const sorted = row.slice().sort((a, b) => a - b);
    return sorted[sorted.length - 1] - sorted[0];
  }

  public static evenly(row: number[]): number {
    for (let j = 1; j < row.length; j++) {
      const b = row[j];
      for (let i = 0; i < j; i++) {
        const a = row[i];
        if (a < b) {
          if (b % a === 0) {
            return b / a;
          }
        } else {
          if (a % b === 0) {
            return a / b;
          }
        }
      }
    }
    throw new Error('no solution found');
  }
}
