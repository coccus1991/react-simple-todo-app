export default class BaseEntity {
    toJSON() {
        const obj: Record<string, unknown> = {};

        for (const n in this) {
            if (!n.match(/^_/) && typeof this[n] != 'function')
                obj[n] = this[n];
        }

        return obj;
    }

    set(obj: object) {
        for (const key in obj) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this[key] = obj[key];
        }

        return this;
    }
}
