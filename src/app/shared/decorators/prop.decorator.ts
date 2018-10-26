import 'reflect-metadata';

export function Tracked(target: any, key: string) {
  let val = target[key];
  const getter = function() {
    return val;
  };
  const setter = function(newVal) {
    val = newVal;
    const isDefined = (typeof newVal !== 'undefined' && newVal != null);
    Reflect.defineMetadata(key, isDefined, this);
  };
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

export function Prop(KEY: any) {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      const isMapDefined: boolean = (Reflect.getOwnMetadata(KEY, this) || false);

      if (!isMapDefined) {
        return;
      }

      return Reflect.apply(originalMethod, this, args);
    };
  };
}
