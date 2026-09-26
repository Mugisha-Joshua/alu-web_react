import { Map } from 'immutable';
import mergeDeeplyElements from './6-deeply';

const page1 = {
  'user-1': {
    id: 1,
    name: 'test',
    likes: {
      1: {
        uid: 1234,
      },
    },
  },
};

const page2 = {
  'user-1': {
    likes: {
      2: {
        uid: 134,
      },
    },
  },
};

describe('mergeDeeplyElements', () => {
  it('returns an Immutable Map', () => {
    expect(Map.isMap(mergeDeeplyElements(page1, page2))).toBe(true);
  });

  it('combines the nested values instead of replacing them', () => {
    expect(mergeDeeplyElements(page1, page2).toJS()).toEqual({
      'user-1': {
        id: 1,
        name: 'test',
        likes: {
          1: {
            uid: 1234,
          },
          2: {
            uid: 134,
          },
        },
      },
    });
  });

  it('does not modify the objects it was given', () => {
    mergeDeeplyElements(page1, page2);

    expect(Object.keys(page1['user-1'].likes)).toEqual(['1']);
  });
});
