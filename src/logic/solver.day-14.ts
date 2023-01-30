import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';
import { Day10 } from './solver.day-10';

export class Day14 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    return {
      partOne: this._partOne(this._input.trim()),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(input: string): Promise<string> {
    let used = 0;
    for (let i = 0; i < 128; i++) {
      const row = `${input}-${i}`;
      const hash = Day10.knotHash(row);
      used += hash.split('').reduce((count, nibble) => {
        return count + this._bitsInNibble(nibble);
      }, 0);
    }

    return Promise.resolve(used.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve('🎄');
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
