import { List, Map } from 'immutable';
import { concatElements, mergeElements } from './5-merge';

describe('concatElements', () => {
  it('returns a List with the values of both pages', () => {
    const result = concatElements([1, 2, 3], [4, 5, 6]);

    expect(List.isList(result)).toBe(true);
    expect(result.toJS()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('keeps duplicated values from both pages', () => {
    expect(concatElements(['a', 'b'], ['b', 'c']).toJS()).toEqual(['a', 'b', 'b', 'c']);
  });
});

describe('mergeElements', () => {
  it('returns the values of both pages', () => {
    const result = mergeElements({ a: 1, b: 2 }, { c: 3 });

    expect(Map.isMap(result)).toBe(true);
    expect(result.toJS()).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('uses the values of page2 when a key exists in both', () => {
    const result = mergeElements({ a: 1, b: 2 }, { b: 20, c: 3 });

    expect(result.get('b')).toBe(20);
    expect(result.toJS()).toEqual({ a: 1, b: 20, c: 3 });
  });
});
