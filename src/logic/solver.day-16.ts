import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Move =
  | { move: 'spin'; num: number }
  | { move: 'exchange'; a: number; b: number }
  | { move: 'partner'; a: string; b: string };

type Dance = Move[];

export class Day16 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const moves = Day16._parseInput(this._input);

    return {
      partOne: this._partOne(moves),
      partTwo: this._partTwo(moves),
    };
  }

  private _partOne(moves: Dance): Promise<string> {
    const formation = 'abcdefghijklmnop'.split('');
    const result = moves
      .reduce((f, m) => Day16._dance(f, m), formation)
      .join('');

    return Promise.resolve(result);
  }

  private _partTwo(moves: Dance): Promise<string> {
    let formation = 'abcdefghijklmnop';
    const [start, length] = this._findCycle(formation, moves);

    const rem = (1000000000 - start) % length;
    for (let i = 0; i < start + rem; i++) {
      formation = moves
        .reduce((f, m) => Day16._dance(f, m), formation.split(''))
        .join('');
    }

    return Promise.resolve(formation);
  }

  private static _parseInput(input: string): Dance {
    const reSpin = /s(\d+)/;
    const reExchange = /x(\d+)\/(\d+)/;
    const rePartner = /p([a-p])\/([a-p])/;

    return input
      .trim()
      .split(',')
      .filter((m) => m)
      .map((m) => {
        const isSpin = m.match(reSpin);
        if (isSpin) {
          return { move: 'spin', num: parseInt(isSpin.at(1) ?? '') };
        }

        const isExchange = m.match(reExchange);
        if (isExchange) {
          return {
            move: 'exchange',
            a: parseInt(isExchange.at(1) ?? ''),
            b: parseInt(isExchange.at(2) ?? ''),
          };
        }

        const isPartner = m.match(rePartner);
        if (isPartner) {
          return {
            move: 'partner',
            a: isPartner.at(1) ?? '',
            b: isPartner.at(2) ?? '',
          };
        }

        throw new Error(`parser error on ${m}`);
      });
  }

  private static _dance(formation: string[], move: Move): string[] {
    switch (move.move) {
      case 'spin':
        return Day16._spin(formation, move.num);
      case 'exchange':
        return Day16._exchange(formation, move.a, move.b);
      case 'partner':
        return Day16._partner(formation, move.a, move.b);
      default:
        throw new Error('invalid move');
    }
  }

  private static _spin(formation: string[], num: number): string[] {
    return formation
      .slice(-num)
      .concat(formation.slice(0, formation.length - num));
  }

  private static _exchange(
    formation: string[],
    a: number,
    b: number
  ): string[] {
    const atA = formation[a];
    const atB = formation[b];
    formation[a] = atB;
    formation[b] = atA;
    return formation;
  }

  private static _partner(formation: string[], a: string, b: string): string[] {
    const iA = formation.indexOf(a);
    const iB = formation.indexOf(b);
    formation[iA] = b;
    formation[iB] = a;
    return formation;
  }

  private _findCycle(formation: string, moves: Dance): [number, number] {
    const results: string[] = [formation];

    for (;;) {
      const result = moves
        .reduce(
          (f, m) => Day16._dance(f, m),
          results[results.length - 1].split('')
        )
        .join('');
      const start = results.indexOf(result);

      if (start >= 0) {
        return [start, results.length - start];
      }

      results.push(result);
    }
  }
}
