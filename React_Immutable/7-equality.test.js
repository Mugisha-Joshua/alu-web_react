import { Map, fromJS } from 'immutable';
import areMapsEqual from './7-equality';

describe('areMapsEqual', () => {
  it('returns true for two Maps holding the same values', () => {
    const map1 = Map({ firstName: 'Guillaume', lastName: 'Salva' });
    const map2 = Map({ firstName: 'Guillaume', lastName: 'Salva' });

    expect(areMapsEqual(map1, map2)).toBe(true);
  });

  it('returns false when a value differs', () => {
    const map1 = Map({ firstName: 'Guillaume', lastName: 'Salva' });
    const map2 = Map({ firstName: 'Guillaume', lastName: 'Doe' });

    expect(areMapsEqual(map1, map2)).toBe(false);
  });

  it('returns false when a key is missing', () => {
    expect(areMapsEqual(Map({ a: 1, b: 2 }), Map({ a: 1 }))).toBe(false);
  });

  it('compares nested Maps by value', () => {
    const map1 = fromJS({ name: { first: 'Guillaume' } });
    const map2 = fromJS({ name: { first: 'Guillaume' } });

    expect(areMapsEqual(map1, map2)).toBe(true);
  });
});
