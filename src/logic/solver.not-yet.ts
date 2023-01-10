import type { PuzzleSolver } from '@/models/puzzle.types';

export class NotYet implements PuzzleSolver {
  constructor(private _input: string) {}

  public partOne(): string {
    return '⛄';
  }

  public partTwo(): string {
    return '🎄';
  }
}
