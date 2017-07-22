import { Notes } from './notes';

/** Fretboard items */
export namespace Fretboards {
    /** Map helper */
    interface TuningMap<V> {
        [k: string]: V;
    }

    /** Supported tunings */
    export const Tunings: TuningMap<string> = {
        'E': 'E A D G B E',
    };

    /** Tuning class */
    class Tuning {
        protected _notes: Array<Notes.Note> = [];

        constructor(tuning: string) {
            for (const noteName of tuning.split(' ')) {
                this._notes.push(new Notes.Note(noteName));
            }
        }
        /** Return notes of the tuning */
        notes(): Array<Notes.Note> {
            return this._notes;
        }
    }

    /**
     * Fretboard defines a fretboard in a given tuning
     * and allows to convert a tab to actual played notes
     */
    export class Fretboard {
        protected tuning: Array<Notes.Note>;

        /** Build a fretboard for given tuning - exception if unknown tuning */
        static From(tuningName: string): Fretboard {
            const tuning: string = Tunings[tuningName];
            if (!tuning) {
                throw new TypeError('Could not find tuning ' + tuningName);
            }
            return new Fretboard(tuning);
        }

        /** build a fretboard object based on proviced tuning string */
        constructor(tuning: string) {
            this.tuning = new Tuning(tuning).notes();
        }

        /** asNotes return a give tab as notes */
        public asNotes(tab: string): Array<Notes.Note> {
            if (!tab) {
                return [];
            }

            const tabInterval: Array<number> = [];
            for (const tabValue of tab.toLowerCase().split(/\ |,/)) {
                switch (tabValue) {
                    case 'x':
                        tabInterval.push(-1);
                        break;
                    default:
                        tabInterval.push(Number(tabValue));
                        break;
                }
            }
            if (tabInterval.length !== this.tuning.length) {
                throw new TypeError('Tab interval size ('
                    + tabInterval.length
                    + ') does not match tuning length ('
                    + this.tuning.length + ')');
            }

            const playedNotes: Array<Notes.Note> = [];
            for (let i = 0; i < tabInterval.length; ++i) {
                if (tabInterval[i] >= 0) {
                    playedNotes.push(this.tuning[i].addSemitones(tabInterval[i]));
                }
            }
            return playedNotes;
        }
    }
}
