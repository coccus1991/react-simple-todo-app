export function propertyMap(sourceProperty:string) {
    return function (target: any, propertyKey: string) {
        if(!target.constructor._propertyMap){
            target.constructor._propertyMap ={};
        }
        target.constructor._propertyMap[sourceProperty] = propertyKey;
    }
}

export class ModelMapper<T> {
    _propertyMapping: any;
    _target: any;
    constructor(type: { new(): T ;}){
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
    }

    map(source){
        Object.keys(source).forEach((key) => {
            const mappedKey = this._propertyMapping[key];

            if(mappedKey){
                this._target[mappedKey] = source[key];
            }
            else if(typeof this._target[key] !== undefined) {
                this._target[key] = source[key];
            }
        });

        return this._target;
    }
}
