import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class NotYet implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    return {
      partOne: this._partOne(),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(): Promise<string> {
    return Promise.resolve('⛄');
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve('🎄');
  }
}
