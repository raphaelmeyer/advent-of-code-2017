import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Firewall = Map<number, number>;

export class Day13 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const fw = this._parseInput(this._input);

    return {
      partOne: this._partOne(fw),
      partTwo: this._partTwo(fw),
    };
  }

  private _partOne(fw: Firewall): Promise<string> {
    let severity = 0;
    fw.forEach((range, depth) => {
      const period = (range - 1) * 2;
      if (depth % period === 0) {
        severity += range * depth;
      }
    });
    return Promise.resolve(severity.toString());
  }

  private _partTwo(fw: Firewall): Promise<string> {
    let delay = 0;
    while (this._caught(fw, delay)) {
      delay++;
    }
    return Promise.resolve(delay.toString());
  }

  private _caught(fw: Firewall, delay: number) {
    const it = fw.entries();
    let scanner = it.next();
    while (!scanner.done) {
      const depth = scanner.value.at(0) ?? 0;
      const range = scanner.value.at(1) ?? 0;

      const period = (range - 1) * 2;
      if ((depth + delay) % period === 0) {
        return true;
      }

      scanner = it.next();
    }

    fw.forEach((range, depth) => {
      const period = (range - 1) * 2;
      if (depth % period === 0) {
        return true;
      }
    });

    return false;
  }

  private _parseInput(input: string): Firewall {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
      .reduce((fw, line) => {
        const scanner = this._parseLine(line);
        return fw.set(scanner.depth, scanner.range);
        return fw;
      }, new Map());
  }

  private _parseLine(line: string): { depth: number; range: number } {
    const match = line.match(/(\d+): (\d+)/);
    if (match) {
      const depth = parseInt(match.at(1) ?? '');
      const range = parseInt(match.at(2) ?? '');
      return { depth: depth, range: range };
    }
    throw new Error(`could not parse line: ${line}`);
  }
}
