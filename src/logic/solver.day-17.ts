import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

interface State {
  cur: number;
  buf: number[];
}

export class Day17 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const steps = parseInt(this._input);

    return {
      partOne: this._partOne(steps),
      partTwo: this._partTwo(steps),
    };
  }

  private _partOne(steps: number): Promise<string> {
    let state: State = { cur: 0, buf: [0] };
    while (state.buf.length <= 2017) {
      state = Day17._step(state, steps);
    }

    const i = state.buf.indexOf(2017);

    return Promise.resolve(state.buf[i + 1].toString());
  }

  private _partTwo(steps: number): Promise<string> {
    const result = Day17._track(steps, 50000000);
    return Promise.resolve(result.toString());
  }

  private static _step(state: State, steps: number): State {
    state.cur = ((state.cur + steps) % state.buf.length) + 1;
    state.buf.splice(state.cur, 0, state.buf.length);
    return state;
  }

  private static _track(steps: number, maxValue: number): number {
    let afterZero = 0;
    let cur = 0;
    for (let value = 1; value <= maxValue; value++) {
      cur = ((cur + steps) % value) + 1;
      if (cur === 1) {
        afterZero = value;
      }
    }
    return afterZero;
  }
}
