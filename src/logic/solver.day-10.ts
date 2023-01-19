import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day10 implements PuzzleSolver {
  private _lengths: number[] = [];

  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    this._lengths = Day10.parseInput(this._input);

    return {
      partOne: this._partOne(),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(): Promise<string> {
    const knoted = Day10.knot(this._lengths, 256);
    const product = knoted[0] * knoted[1];
    return Promise.resolve(product.toString());
  }

  private _partTwo(): Promise<string> {
    const lengths = this._input
      .trim()
      .split('')
      .map((c) => c.charCodeAt(0))
      .concat([17, 31, 73, 47, 23]);

    const sparse = Day10.knot(lengths, 256, 64);
    const groups: number[][] = [];
    for (let g = 0; g < 256; g += 16) {
      groups.push(sparse.slice(g, g + 16));
    }

    const dense = groups
      .map((group) => group.reduce((xord, ch) => xord ^ ch), 0)
      .flat()
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('');

    return Promise.resolve(dense.toString());
  }

  public static parseInput(input: string): number[] {
    return input
      .trim()
      .split(',')
      .map((n) => parseInt(n));
  }

  public static knot(
    lengths: number[],
    size: number,
    rounds: number = 1
  ): number[] {
    let list: number[] = [];
    for (let i = 0; i < size; i++) {
      list.push(i);
    }

    let skip = 0;
    let pos = 0;

    for (let round = 0; round < rounds; round++) {
      lengths.forEach((l) => {
        list = list.slice(0, l).reverse().concat(list.slice(l));

        const cur = (l + skip) % size;
        list = list.slice(cur).concat(list.slice(0, cur));

        pos = (pos + cur) % size;
        skip++;
      });
    }

    list = list.slice(size - pos).concat(list.slice(0, size - pos));

    return list;
  }
}
