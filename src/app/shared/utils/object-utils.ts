import {isObject} from 'util';

// @see https://gist.github.com/penguinboy/762197#gistcomment-2224566
export function squash(obj: {}, keys: any = []): {} {
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, isObject(obj[key])
      ? squash(obj[key], keys.concat(key))
      : {[key]: obj[key]}
    );
  }, {});
}
