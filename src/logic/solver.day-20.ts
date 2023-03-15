import type { PuzzleAnswer, PuzzleSolver } from '@/models/puzzle.types';

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  p: Coordinates;
  v: Coordinates;
  a: Coordinates;
}

export class Day20 implements PuzzleSolver {
  private static _reParticle = /p=<(.*)>, v=<(.*)>, a=<(.*)>/;

  constructor(private _input: string) {}

  solve(): PuzzleAnswer {
    const particles = Day20._parseInput(this._input);

    return {
      partOne: this._partOne(particles),
      partTwo: this._partTwo(),
    };
  }

  private _partOne(particles: Particle[]): Promise<string> {
    const slowest = this._findSlowest(particles);
    return Promise.resolve(slowest.toString());
  }

  private _partTwo(): Promise<string> {
    return Promise.resolve('🎄');
  }

  private _findSlowest(particles: Particle[]): number {
    const accelerations = particles.map(
      (part) => Math.abs(part.a.x) + Math.abs(part.a.y) + Math.abs(part.a.z)
    );

    const slowest = accelerations.reduce(
      (min, accel, index) => {
        if (accel < min.accel) {
          return { index: index, accel: accel };
        } else {
          return min;
        }
      },
      { index: 0, accel: accelerations.at(0) ?? 0 }
    );

    return slowest.index;
  }

  private static _parseInput(input: string): Particle[] {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) => Day20._parseParticle(line));
  }

  private static _parseParticle(line: string): Particle {
    const match = line.match(this._reParticle);
    if (match) {
      return {
        p: Day20._parseCoord(match.at(1) ?? ''),
        v: Day20._parseCoord(match.at(2) ?? ''),
        a: Day20._parseCoord(match.at(3) ?? ''),
      };
    }
    throw new Error(`could not parse ${line}`);
  }

  private static _parseCoord(input: string): Coordinates {
    const coord = input.split(',').map((c) => parseInt(c));
    return { x: coord.at(0) ?? 0, y: coord.at(1) ?? 0, z: coord.at(2) ?? 0 };
  }
}
