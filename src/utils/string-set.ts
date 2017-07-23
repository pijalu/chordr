import { StringMap } from './string-map';
/** Helper for tracking note as set */
interface SetItem { [k: string]: boolean; }

/** Simple string set */
export class StringSet extends StringMap<boolean> {
    constructor() { super(); }

    /** Add value to set */
    add(value: string) {
        this.put(value, true);
    }
    
    toString(): string {
        return '{' + this.keys().join(',') + '}';
    }
}
