import {inArray} from './array-utils';
import {squash} from '@app/shared/utils/object-utils';

describe('object-utils', () => {
  describe(inArray.name, () => {
    it('squash correct', () => {
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
      expect(squash(object)).toEqual(expectedObject);
    });
  });
});
