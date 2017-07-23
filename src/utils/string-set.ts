/** Helper for tracking note as set */
interface SetItem { [k: string]: boolean; }

/** Simple string set */
export class StringSet {
    private data: SetItem = {};
    constructor() { }

    /** Add value to set */
    add(value: string) {
        this.data[value] = true;
    }

    /** Remove */
    remove(value: string) {
        delete this.data[value];
    }

    /** Check if an element exists */
    exists(value: string): boolean {
        return this.data[value] !== undefined;
    }

    /** Return number of elm */
    size(): number {
        return Object.keys(this.data).length;
    }

    toString(): string {
        return '{' + Object.keys(this.data).join(',') + '}';
    }
}
