import { Map, fromJS } from 'immutable';
import getImmutableObject from './0-fromjs';

const object = {
  fear: true,
  smell: -1033575916.9145899,
  wall: false,
  thing: -914767132,
};

describe('getImmutableObject', () => {
  it('returns an Immutable Map', () => {
    expect(Map.isMap(getImmutableObject(object))).toBe(true);
  });

  it('keeps every key and value of the plain object', () => {
    const result = getImmutableObject(object);

    expect(result.size).toBe(4);
    expect(result.get('fear')).toBe(true);
    expect(result.get('smell')).toBe(-1033575916.9145899);
    expect(result.get('wall')).toBe(false);
    expect(result.get('thing')).toBe(-914767132);
  });

  it('is equal to the same object converted with fromJS', () => {
    expect(getImmutableObject(object).equals(fromJS(object))).toBe(true);
  });

  it('converts nested objects deeply', () => {
    const result = getImmutableObject({ name: { first: 'Guillaume' } });

    expect(Map.isMap(result.get('name'))).toBe(true);
    expect(result.getIn(['name', 'first'])).toBe('Guillaume');
  });
});
