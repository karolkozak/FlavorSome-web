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

export function deepCompare(object: any, object2: any): boolean {
  const first = object ? JSON.stringify(object) : object;
  const second = object2 ? JSON.stringify(object2) : object2;
  return first === second;
}
