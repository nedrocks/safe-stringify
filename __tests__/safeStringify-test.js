jest.unmock('../index');

import safeStringify from '../index';

describe('Safe Stringify', () => {
  it('should stringify primitive values', () => {
    [null, 0, '0', true, Symbol('asdf')].forEach((elem) => {
      expect(safeStringify(elem)).toEqual(JSON.stringify(elem));
    });
  });

  it('should stringify object with no cycles', () => {
    const toStringify = {
      a: 1,
      b: 2,
      c: {
        d: [1, 3, 4],
        e: {
          f: 1,
          g: null
        }
      },
      h: 10
    };

    expect(safeStringify(toStringify)).toEqual(JSON.stringify(toStringify));
  });

  it('should catch cycles', () => {
    const objectA = {
      a: 1,
    };
    const objectB = {
      a: objectA,
    }
    objectA.b = objectB;

    const stringified = safeStringify(objectA);
    console.log(stringified);
    
  });
});
