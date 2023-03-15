import { describe, it, expect } from 'vitest';
import { Day20 } from '../solver.day-20';

const example = `
p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
`;

describe('Day 20', () => {
  it('should find its way through tubes', async () => {
    const answer = new Day20(example).solve();
    expect(await answer.partOne).toEqual('0');
  });

  it('should count the steps', async () => {
    const answer = new Day20(example).solve();
    expect(await answer.partTwo).toEqual('');
  });

  it('should parse the input', () => {
    const particles = Day20['_parseInput'](example);

    expect(particles).toHaveLength(2);
    expect(particles.at(0)?.p.x).toStrictEqual(3);
    expect(particles.at(0)?.v.z).toStrictEqual(0);
    expect(particles.at(1)?.a.x).toStrictEqual(-2);
  });

  it('should parse a particle', () => {
    const particle = Day20['_parseParticle'](
      'p=<-1814,6046,-5354>, v=<-18,-93,8>, a=<5,-7,11>'
    );

    expect(particle.p).toStrictEqual({ x: -1814, y: 6046, z: -5354 });
    expect(particle.v).toStrictEqual({ x: -18, y: -93, z: 8 });
    expect(particle.a).toStrictEqual({ x: 5, y: -7, z: 11 });
  });
});
