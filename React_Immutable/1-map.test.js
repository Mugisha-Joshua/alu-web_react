import { Map } from 'immutable';
import getImmutableObject from './1-map';

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
    expect(result.get('thing')).toBe(-914767132);
  });

  it('only converts the first level, unlike fromJS', () => {
    const result = getImmutableObject({ name: { first: 'Guillaume' } });

    expect(Map.isMap(result)).toBe(true);
    expect(Map.isMap(result.get('name'))).toBe(false);
    expect(result.get('name')).toEqual({ first: 'Guillaume' });
  });
});
