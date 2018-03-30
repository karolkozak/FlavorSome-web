import {inArray} from './array-utils';
import {flatten} from '@app/shared/utils/object-utils';

describe('object-utils', () => {
  describe(inArray.name, () => {
    it('flatten correct', () => {
      const object = {
        firstname: 'john',
        lastname: 'doe',
        address: {
          street: 'downhill',
          city: 'LA'
        }
      };
      const expectedObject = {
        firstname: 'john',
        lastname: 'doe',
        street: 'downhill',
        city: 'LA'
      };
      expect(flatten(object)).toEqual(expectedObject);
    });
  });
});
