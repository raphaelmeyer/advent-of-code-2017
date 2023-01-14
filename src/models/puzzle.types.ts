export interface PuzzleAnswer {
  partOne: Promise<string>;
  partTwo: Promise<string>;
}

export interface PuzzleSolver {
  solve(): PuzzleAnswer;
}

export interface SolverConstructor {
  new (input: string): PuzzleSolver;
}

export interface Puzzle {
  day: number;
  name: string;
  solver: SolverConstructor;
}
