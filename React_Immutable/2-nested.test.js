import { Map } from 'immutable';
import accessImmutableObject from './2-nested';

const object = {
  name: {
    first: 'Guillaume',
    last: 'Salva',
  },
};

describe('accessImmutableObject', () => {
  it('returns the string at the given path', () => {
    expect(accessImmutableObject(object, ['name', 'first'])).toBe('Guillaume');
    expect(accessImmutableObject(object, ['name', 'last'])).toBe('Salva');
  });

  it('returns a Map when the path points to an object', () => {
    const result = accessImmutableObject(object, ['name']);

    expect(Map.isMap(result)).toBe(true);
    expect(result.get('first')).toBe('Guillaume');
  });

  it('returns undefined when the path does not exist', () => {
    expect(accessImmutableObject(object, ['name', 'middle'])).toBeUndefined();
    expect(accessImmutableObject(object, ['address'])).toBeUndefined();
  });
});
