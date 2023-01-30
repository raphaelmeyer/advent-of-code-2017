import { Day01 } from '@/logic/solver.day-01';
import { Day02 } from '@/logic/solver.day-02';
import { Day03 } from '@/logic/solver.day-03';
import { Day04 } from '@/logic/solver.day-04';
import { Day05 } from '@/logic/solver.day-05';
import { Day06 } from '@/logic/solver.day-06';
import { Day07 } from '@/logic/solver.day-07';
import { Day08 } from '@/logic/solver.day-08';
import { Day09 } from '@/logic/solver.day-09';
import { Day10 } from '@/logic/solver.day-10';
import { Day11 } from '@/logic/solver.day-11';
import { Day12 } from '@/logic/solver.day-12';
import { Day13 } from '@/logic/solver.day-13';
import { Day14 } from '@/logic/solver.day-14';
import { NotYet } from '@/logic/solver.not-yet';
import type { Puzzle } from '@/models/puzzle.types';

export const puzzles: Puzzle[] = [
  { day: 1, name: 'Inverse Captcha', solver: Day01 },
  { day: 2, name: 'Corruption Checksum', solver: Day02 },
  { day: 3, name: 'Spiral Memory', solver: Day03 },
  { day: 4, name: 'High-Entropy Passphrases', solver: Day04 },
  { day: 5, name: 'A Maze of Twisty Trampolines, All Alike', solver: Day05 },
  { day: 6, name: 'Memory Reallocation', solver: Day06 },
  { day: 7, name: 'Recursive Circus', solver: Day07 },
  { day: 8, name: 'I Heard You Like Registers', solver: Day08 },
  { day: 9, name: 'Stream Processing', solver: Day09 },
  { day: 10, name: 'Knot Hash', solver: Day10 },
  { day: 11, name: 'Hex Ed', solver: Day11 },
  { day: 12, name: 'Digital Plumber', solver: Day12 },
  { day: 13, name: 'Packet Scanners', solver: Day13 },
  { day: 14, name: 'Disk Defragmentation', solver: Day14 },
  { day: 15, name: 'Dueling Generators', solver: NotYet },
];
