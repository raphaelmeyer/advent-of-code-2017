import type { PuzzleSolver } from '@/models/puzzle.types';

export class Day04 implements PuzzleSolver {
  private _passphrases: string[][];

  public constructor(private _input: string) {
    this._passphrases = Day04.parseInput(_input);
  }

  public partOne(): string {
    const valid = this._passphrases.filter((pph) => Day04.isValid(pph));
    return valid.length.toString();
  }

  public partTwo(): string {
    const valid = this._passphrases.filter((pph) => Day04.anotherPolicy(pph));
    return valid.length.toString();
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
