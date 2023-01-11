import { Day01 } from '@/logic/solver.day-01';
import { Day02 } from '@/logic/solver.day-02';
import { Day03 } from '@/logic/solver.day-03';
import { Day04 } from '@/logic/solver.day-04';
import { Day05 } from '@/logic/solver.day-05';
import { NotYet } from '@/logic/solver.not-yet';
import type { Puzzle } from '@/models/puzzle.types';

export const puzzles: Puzzle[] = [
  { day: 1, name: 'Inverse Captcha', solver: Day01 },
  { day: 2, name: 'Corruption Checksum', solver: Day02 },
  { day: 3, name: 'Spiral Memory', solver: Day03 },
  { day: 4, name: 'High-Entropy Passphrases', solver: Day04 },
  { day: 5, name: 'A Maze of Twisty Trampolines, All Alike', solver: Day05 },
  { day: 6, name: '', solver: NotYet },
  { day: 7, name: '', solver: NotYet },
  { day: 8, name: '', solver: NotYet },
  { day: 9, name: '', solver: NotYet },
  { day: 10, name: '', solver: NotYet },
  { day: 11, name: '', solver: NotYet },
  { day: 12, name: '', solver: NotYet },
];
