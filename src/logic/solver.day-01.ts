import type { PuzzleSolver } from '@/models/puzzle.types';

export class Day01 implements PuzzleSolver {
  constructor(private _input: string) {}

  public partOne(): string {
    const trimmed = this._input.trim();
    const result = Array.from(trimmed).reduce(
      (captcha, digit, i, digits): number => {
        if (digit === digits.at((i + 1) % digits.length)) {
          return captcha + parseInt(digit);
        }
        return captcha;
      },
      0
    );

    return result.toString();
  }

  public partTwo(): string {
    const trimmed = this._input.trim();
    const half = trimmed.length / 2;
    const result = Array.from(trimmed).reduce(
      (captcha, digit, i, digits): number => {
        if (digit === digits.at((i + half) % digits.length)) {
          return captcha + parseInt(digit);
        }
        return captcha;
      },
      0
    );

    return result.toString();
  }
}
