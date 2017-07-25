/** Helper for tracking note as set */
interface SetItem<V> { [k: string]: V; }

export interface KeySetItem<V> {
    key: string;
    value: V;
}

/** Simple string map */
export class StringMap<V> {
    public data: SetItem<V> = {};
    constructor() { }

    /** keys */
    keys(): Array<string> {
        return Object.keys(this.data);
    }

    /** get values */
    values(): Array<V> {
        const values: Array<V> = [];
        for (const key of this.keys()) {
            values.push(this.data[key]);
        }
        return values;
    }

    /** get key/value */
    keySet(): Array<KeySetItem<V>> {
        const result: Array<KeySetItem<V>> = [];
        for (const key of this.keys()) {
            result.push({
                key: key,
                value: this.data[key]
            });
        }
        return result;
    }

    /** put elm */
    put(key: string, value: V) {
        this.data[key] = value;
    }

    /** get value */
    get(key: string): V {
        return this.data[key];
    }

    /** remove elm */
    remove(key: string) {
        delete this.data[key];
    }

    /** Check if an element exists */
    contains(value: string): boolean {
        return this.get(value) !== undefined;
    }

    /** Return number of elm */
    size(): number {
        return this.keys().length;
    }

    /** return string representation (JSON) */
    toString(): string {
        return JSON.stringify(this.data);
    }
}
