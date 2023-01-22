import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

type Pipes = Map<number, number[]>;

export class Day12 implements PuzzleSolver {
  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const pipes = this._parseInput(this._input);

    return {
      partOne: this._partOne(pipes),
      partTwo: this._partTwo(pipes),
    };
  }

  private _partOne(pipes: Pipes): Promise<string> {
    const visited: number[] = [0];
    const queue: number[] = [0];
    const group: number[] = [];

    while (queue.length > 0) {
      const next = queue.shift();

      if (next !== undefined) {
        const connected = pipes.get(next) ?? [];
        connected.forEach((c) => {
          if (visited.find((v) => v === c) === undefined) {
            queue.push(c);
            visited.push(c);
          }
        });
        group.push(next);
      }
    }

    return Promise.resolve(group.length.toString());
  }

  private _partTwo(pipes: Pipes): Promise<string> {
    const visited: number[] = [];
    const queue: number[] = [];
    let groups = 0;

    let start = [...pipes.keys()].find(
      (k) => visited.find((v) => v === k) === undefined
    );
    while (start !== undefined) {
      visited.push(start);
      queue.push(start);

      while (queue.length > 0) {
        const next = queue.shift();

        if (next !== undefined) {
          const connected = pipes.get(next) ?? [];
          connected.forEach((c) => {
            if (visited.find((v) => v === c) === undefined) {
              queue.push(c);
              visited.push(c);
            }
          });
        }
      }
      groups++;

      start = [...pipes.keys()].find(
        (k) => visited.find((v) => v === k) === undefined
      );
    }

    return Promise.resolve(groups.toString());
  }

  private _parseInput(input: string): Pipes {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
      .reduce((pipes, line) => this._parseLine(pipes, line), new Map());
  }

  private _parseLine(pipes: Pipes, line: string): Pipes {
    const match = line.match(/^(\d+) <-> ([0-9, ]+$)/);
    if (match) {
      const id = parseInt(match.at(1) ?? '');
      const connected = (match.at(2) ?? '')
        .split(',')
        .map((n) => parseInt(n.trim()));
      pipes.set(id, connected);
    }

    return pipes;
  }
}
