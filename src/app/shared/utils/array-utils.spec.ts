import {inArray} from './array-utils';

describe('array-utils', () => {
  describe(inArray.name, () => {
    it('check if exists in array', () => {
      const array = ['qwe', 'asd'];
      const exists = 'qwe';
      const notExists = 'zxc';
      expect(inArray(exists, array)).toBeTruthy();
      expect(inArray(notExists, array)).toBeFalsy();
    });
  });
});
