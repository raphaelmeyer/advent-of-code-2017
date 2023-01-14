import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

export class Day04 implements PuzzleSolver {
  public constructor(private _input: string) {}

  public solve(): PuzzleAnswer {
    const passphrases = Day04.parseInput(this._input);
    return {
      partOne: this._partOne(passphrases),
      partTwo: this._partTwo(passphrases),
    };
  }

  private _partOne(passphrases: string[][]): Promise<string> {
    const valid = passphrases.filter((pph) => Day04.isValid(pph));
    return Promise.resolve(valid.length.toString());
  }

  private _partTwo(passphrases: string[][]): Promise<string> {
    const valid = passphrases.filter((pph) => Day04.anotherPolicy(pph));
    return Promise.resolve(valid.length.toString());
  }

  public static parseInput(input: string): string[][] {
    return input
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        return line.trim().split(/\s+/);
      });
  }

  public static isValid(passphrase: string[]): boolean {
    const uniques = passphrase.reduce<string[]>((us, word) => {
      const found = us.find((u) => u === word);
      if (!found) {
        us.push(word);
      }
      return us;
    }, []);
    return passphrase.length === uniques.length;
  }

  public static anotherPolicy(passphrase: string[]): boolean {
    const sorted = passphrase.map((word) => Array.from(word));
    sorted.forEach((chars) => chars.sort());

    const joined = sorted.map((chars) => chars.join());

    return Day04.isValid(joined);
  }
}
