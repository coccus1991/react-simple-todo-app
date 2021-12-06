export default class BaseEntity {

    toJSON() {
        let obj = {} as any;

        for (let n in this) {
            if (!n.match(/^_/) && typeof this[n] != "function")
                obj[n] = this[n];
        }

        return obj;
    }

    set(obj: object) {
        for (let key in obj)
            this[key] = obj[key];

        return this;
    }
}