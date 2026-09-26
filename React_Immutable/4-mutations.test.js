import { Map } from 'immutable';
import { map, map2 } from './4-mutations';

describe('map', () => {
  it('is an Immutable Map holding the six names', () => {
    expect(Map.isMap(map)).toBe(true);
    expect(map.size).toBe(6);
    expect(map.get('1')).toBe('Liam');
    expect(map.get('2')).toBe('Noah');
    expect(map.get('6')).toBe('Lucas');
  });
});

describe('map2', () => {
  it('changes the value at index 2 to Benjamin', () => {
    expect(map2.get('2')).toBe('Benjamin');
  });

  it('keeps the value at index 4 as Oliver', () => {
    expect(map2.get('4')).toBe('Oliver');
  });

  it('leaves the other values untouched', () => {
    expect(map2.get('1')).toBe('Liam');
    expect(map2.get('3')).toBe('Elijah');
    expect(map2.get('5')).toBe('Jacob');
    expect(map2.get('6')).toBe('Lucas');
    expect(map2.size).toBe(6);
  });

  it('does not modify the original map', () => {
    expect(map.get('2')).toBe('Noah');
  });
});
