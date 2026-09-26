import { List } from 'immutable';
import { getListObject, addElementToList } from './3-list';

describe('getListObject', () => {
  it('returns an Immutable List', () => {
    expect(List.isList(getListObject([1, 2, 3]))).toBe(true);
  });

  it('keeps every element of the array', () => {
    const list = getListObject(['a', 'b', 'c']);

    expect(list.size).toBe(3);
    expect(list.get(0)).toBe('a');
    expect(list.get(2)).toBe('c');
  });
});

describe('addElementToList', () => {
  it('appends the element at the end of the list', () => {
    const list = getListObject(['a', 'b']);
    const result = addElementToList(list, 'c');

    expect(result.size).toBe(3);
    expect(result.get(2)).toBe('c');
    expect(result.toJS()).toEqual(['a', 'b', 'c']);
  });

  it('does not modify the list it was given', () => {
    const list = getListObject(['a', 'b']);

    addElementToList(list, 'c');

    expect(list.size).toBe(2);
    expect(list.toJS()).toEqual(['a', 'b']);
  });
});
