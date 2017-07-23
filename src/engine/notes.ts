export namespace Notes {
    // Actual notes
    export const NoteName = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
    ];

    /** Note represent a musical note */
    export class Note {
        /** semitone distance from C */
        protected semitone = 0;
        /** is the note is accidental */
        protected _accidental = false;

        /** Parse a series of notes based on string */
        public static asNotes(notesArray: string): Array<Note> {
            const result: Array<Note> = [];
            for (const note of notesArray.split(' ')) {
                result.push(new Note(note));
            }
            return result;
        }

        /** Build a note with optional name param (C is not set) */
        public constructor(name?: string) {
            if (name) {
                this.semitone = NoteName.indexOf(name.toUpperCase());
                if (this.semitone === -1) {
                    throw new SyntaxError('Unkown note:' + name);
                }
                this._accidental = (name.indexOf('#') !== -1);
            }
        }

        /** Get string representation of a series of notes */
        public static Names(notesArray: Array<Note>): string {
            let result = '';
            for (const note of notesArray) {
                result += note.name() + ' ';
            }
            return result.trim();
        }

        /** Get name of the note */
        public name(): string {
            return NoteName[this.semitone % NoteName.length];
        }

        /** return true if the note is an accidental */
        public accidental(): boolean {
            return this._accidental;
        }

        /** Return a new note distant from the given number of semitones */
        public addSemitones(increment: number): Note {
            const note = new Note();
            note.semitone = (this.semitone + increment) % NoteName.length;
            while (note.semitone < 0) {
                note.semitone += NoteName.length;
            }
            return note;
        }
    }
}
