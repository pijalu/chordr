import { Notes } from './notes';

export namespace Chords {
    // Triad defines a triad chord
    class Triad {
        constructor(public name: string, public interval: Array<number>) { }
        Notes(root: Notes.Note): Array<Notes.Note> {
            const result: Array<Notes.Note> = [];
            for (const interval of this.interval) {
                result.push(root.addSemitones(interval));
            }
            return result;
        }
    }

    // Triads allows easier Triad handling
    class Triads {
        private static _triads: Array<Triad> = [
            new Triad('MAJ', [0, 4, 7]),
            new Triad('MIN', [0, 3, 7]),
            new Triad('DIM', [0, 3, 6]),
            new Triad('AUG', [0, 4, 8]),
        ];
        // Return triad based on name
        static byName(name: string): Triad {
            for (const t of Triads._triads) {
                if (t.name === name.toUpperCase()) {
                    return t;
                }
            }
            return undefined;
        }
        // Return the list of triad
        static List(): Array<Triad> {
            return Triads._triads;
        }
    }


    /** Helper for tracking note as set */
    interface NoteSet { [k: string]: Notes.Note; }

    /** Chord class */
    export class Chord {
        /** Remove dups of a series notes */
        private static deDup(notes: Array<Notes.Note>): Array<Notes.Note> {
            const result: Array<Notes.Note> = [];
            const noteSet: NoteSet = {};
            for (const note of notes) {
                noteSet[note.name()] = note;
            }
            for (const key of Object.keys(noteSet)) {
                result.push(noteSet[key]);
            }
            return result;
        }

        /** Return score of played note and proposed triad */
        private static score(playedNotes: Array<Notes.Note>, chordNotes: Array<Notes.Note>): number {
            const playedNotesSet: NoteSet = {};
            for (const note of playedNotes) {
                playedNotesSet[note.name()] = note;
            }

            let matches = 0;
            let accidental = 0;
            for (const chordNote of chordNotes) {
                if (chordNote.accidental()) {
                    accidental++;
                }
                if (playedNotesSet[chordNote.name()]) {
                    matches++;
                }
            }
            if (matches === 0) {
                return -1;
            }
            return matches * 100 + (10 - accidental);
        }

        /**
         * Convert a series of notes to a chord.
         * returns null if there are no matching chords
         */
        public static fromNotes(notes: Array<Notes.Note>): Chord {
            let bestChord: Chord;
            let bestScore: number = -1;

            const uniqNotes = Chord.deDup(notes);
            for (const potentialRoot of uniqNotes) {
                for (const triad of Triads.List()) {
                    const newScore =
                        Chord.score(uniqNotes,
                            triad.Notes(potentialRoot));
                    if (newScore > bestScore) {
                        bestChord = new Chord(potentialRoot, triad);
                        bestScore = newScore;
                    }
                }
            }
            return bestChord;
        }

        private constructor(public root: Notes.Note, public triad: Triad) { }

        /** Get name of chord */
        public Name(): string {
            return this.root.name();
        }

        /** Get type of chord */
        public Type(): string {
            return this.triad.name;
        }

        /** Get name and type of chord */
        public NameAndType(): string {
            return this.Name() + ' ' + this.Type();
        }
    }
}
