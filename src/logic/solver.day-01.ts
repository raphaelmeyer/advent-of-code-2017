import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day01 implements PuzzleSolver {
  constructor(private _input: string) {}

  public solve(): PuzzleAnswer {
    const trimmed = this._input.trim();

    return {
      partOne: this._partOne(trimmed),
      partTwo: this._partTwo(trimmed),
    };
  }

  private async _partOne(input: string): Promise<string> {
    const result = Array.from(input).reduce(
      (captcha, digit, i, digits): number => {
        if (digit === digits.at((i + 1) % digits.length)) {
          return captcha + parseInt(digit);
        }
        return captcha;
      },
      0
    );

    return Promise.resolve(result.toString());
  }

  private async _partTwo(input: string): Promise<string> {
    const half = input.length / 2;
    const result = Array.from(input).reduce(
      (captcha, digit, i, digits): number => {
        if (digit === digits.at((i + half) % digits.length)) {
          return captcha + parseInt(digit);
        }
        return captcha;
      },
      0
    );

    return Promise.resolve(result.toString());
  }
}
