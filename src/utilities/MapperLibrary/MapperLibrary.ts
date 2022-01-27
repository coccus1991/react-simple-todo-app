type propertyMapperClass = {
  constructor: {
    _propertyMap: Record<string, string>
  }
}

export function propertyMap(sourceProperty: string) {
  return function (target: unknown, propertyKey: string) {
    const targetInstance = target as propertyMapperClass

    if (!targetInstance.constructor._propertyMap) {
      targetInstance.constructor._propertyMap = {}
    }
    targetInstance.constructor._propertyMap[sourceProperty] = propertyKey
  }
}

export class ModelMapper<T> {
  _propertyMapping
  _target: T

  constructor(type: { new (): T }) {
    this._target = new type()
    this._propertyMapping = (
      this._target as unknown as propertyMapperClass
    ).constructor._propertyMap
  }

  map<S>(source: S) {
    Object.keys(source).forEach(key => {
      const mappedKey = this._propertyMapping[key]

      if (mappedKey) {
        this._target[mappedKey as keyof T] = (source as unknown as T)[key as keyof T]
      } else if (typeof this._target[key as keyof T] !== undefined) {
        this._target[key as keyof T] = (source as unknown as T)[key as keyof T]
      }
    })

    return this._target
  }
}
