import type { PuzzleSolver } from '@/models/puzzle.types';
import { makeLeft, makeRight, type Either } from './helpers/either';

export interface Disc {
  weight: number;
  subs: string[];
}

export type Tower = Map<string, Disc>;

export class Day07 implements PuzzleSolver {
  _tower: Tower;

  constructor(private _input: string) {
    this._tower = Day07.parseInput(_input);
  }

  public partOne(): string {
    return this._findRoot();
  }

  public partTwo(): string {
    const root = this._findRoot();
    if (root) {
      const result = this._search(root);
      if (result.isRight) {
        return result.value.toString();
      }
    }

    throw new Error('undefined root');
  }

  public static parseInput(input: string): Tower {
    const lines = input.split('\n').filter((line) => line.trim());

    const tower = new Map<string, Disc>();
    lines.forEach((line) => {
      const match = line.match(/^([a-z]+) \((\d+)\)( -> (.*))?$/);
      const name = match?.at(1) ?? '';
      const weight = parseInt(match?.at(2) ?? '');
      const subs =
        match
          ?.at(4)
          ?.split(/[\s,]+/)
          .filter((n) => n.trim()) ?? [];

      tower.set(name, { weight: weight, subs: subs });
    });

    return tower;
  }

  private _search(name: string): Either<number, number> {
    const check = (prgs: { sub: string; weight: number }[]) => {
      const count: { weight: number; programs: string[] }[] = [];
      prgs.forEach((prg) => {
        const item = count.find((c) => c.weight === prg.weight);
        if (item) {
          item.programs.push(prg.sub);
        } else {
          count.push({ weight: prg.weight, programs: [prg.sub] });
        }
      });
      return count;
    };

    const disc = this._tower.get(name);
    if (disc) {
      if (disc.subs.length === 0) {
        return makeLeft<number, number>(disc.weight);
      }

      const ws = disc.subs.map((sub) => {
        return { balance: this._search(sub), sub: sub };
      });

      const result = ws.find((w) => w.balance.isRight);
      if (result) {
        return result.balance;
      }

      const values = ws.reduce<{ sub: string; weight: number }[]>((vs, w) => {
        if (w.balance.isLeft) {
          vs.push({ sub: w.sub, weight: w.balance.left ?? 0 });
        }
        return vs;
      }, []);

      const checked = check(values);
      if (checked.length > 1) {
        checked.sort((a, b) => a.programs.length - b.programs.length);
        const offdisc = this._tower.get(checked[0].programs[0]);
        if (offdisc) {
          return makeRight(
            offdisc.weight + checked[1].weight - checked[0].weight
          );
        }
      }

      return makeLeft(
        disc.weight + values.reduce((sum, d) => sum + d.weight, 0)
      );
    }

    throw new Error('undefined program');
  }

  private _findRoot(): string {
    const subs: string[] = [];
    this._tower.forEach((tower) => {
      subs.push(...tower.subs);
    });

    const it = this._tower.entries();
    let foo = it.next();
    while (!foo.done) {
      if (!subs.find((sub) => sub === foo.value[0])) {
        return foo.value[0];
      }
      foo = it.next();
    }

    return '';
  }
}
