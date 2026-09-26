import printBestStudents from './8-seq';

const grades = {
  1: {
    score: 99,
    firstName: 'guillaume',
    lastName: 'salva',
  },
  2: {
    score: 44,
    firstName: 'john',
    lastName: 'doe',
  },
  3: {
    score: 70,
    firstName: 'marie',
    lastName: 'curie',
  },
};

describe('printBestStudents', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('prints the students with a score of 70 or more, names capitalized', () => {
    printBestStudents(grades);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      1: { score: 99, firstName: 'Guillaume', lastName: 'Salva' },
      3: { score: 70, firstName: 'Marie', lastName: 'Curie' },
    });
  });

  it('filters out every student with a score under 70', () => {
    printBestStudents({ 2: { score: 44, firstName: 'john', lastName: 'doe' } });

    expect(spy).toHaveBeenCalledWith({});
  });

  it('does not modify the object it was given', () => {
    printBestStudents(grades);

    expect(grades[1].firstName).toBe('guillaume');
  });
});
