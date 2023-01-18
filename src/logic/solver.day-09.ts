import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day09 implements PuzzleSolver {
  private _score: number = 0;
  private _garbage: number = 0;

  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    this._removeGarbage();

    return {
      partOne: this._partOne(),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(): Promise<string> {
    return Promise.resolve(this._score.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve(this._garbage.toString());
  }

  private _removeGarbage(): void {
    const stack: string[] = [];
    const stream = this._input.trim();

    let score = 0;
    let nesting = 0;
    let garbage = 0;

    let i = 0;
    while (i < stream.length) {
      switch (stream[i]) {
        case '{':
          stack.push('{');
          nesting++;
          break;

        case '}':
          {
            const top = stack.pop();
            if (top !== '{') {
              throw new Error(`unmatched } at ${i}`);
            }
            score += nesting;
            nesting--;
          }
          break;

        case '<':
          {
            i++;
            while (stream[i] !== '>') {
              if (stream[i] === '!') {
                i++;
              } else {
                garbage++;
              }
              i++;
            }
          }
          break;

        case ',':
          break;

        default:
          throw new Error(`unexpected ${stream[i]} at ${i}`);
      }
      i++;
    }

    this._score = score;
    this._garbage = garbage;
  }
}
