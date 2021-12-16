export function propertyMap(sourceProperty: string) {
    return function (target: unknown, propertyKey: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!target.constructor._propertyMap) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            target.constructor._propertyMap = {};
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target.constructor._propertyMap[sourceProperty] = propertyKey;
    }
}


export class ModelMapper<T> {
    _propertyMapping;
    _target: T;

    constructor(type: { new(): T; }) {
        this._target = new type();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._propertyMapping = this._target.constructor._propertyMap;
    }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map(source) {
        Object.keys(source).forEach((key) => {
            const mappedKey = this._propertyMapping[key];

            if (mappedKey) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this._target[mappedKey] = source[key];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
            } else if (typeof this._target[key] !== undefined) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this._target[key] = source[key];
            }
        });

        return this._target;
    }
}
