export interface PuzzleSolver {
  partOne(): string;
  partTwo(): string;
}

export interface SolverConstructor {
  new (input: string): PuzzleSolver;
}

export interface Puzzle {
  day: number;
  name: string;
  solver: SolverConstructor;
}
