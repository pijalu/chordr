import { Notes } from './notes';
import { Chords } from './chords';

export namespace Modes {
    /** the traditional modes - most of their values can be calculated based on ionian */
    export const TraditionalModes: Array<string> = [
        'ionian',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'aeolian',
        'locrian',
    ];

    /** Mode definition */
    export class Mode {
        /** Semitones distance for the mode */
        semitones: Array<number>;

        /** build a default triads (offset 0: ionian) */
        private static defaultTriads(offset: number): Array<string> {
            const ionianTriads = 'MAJ MIN MIN MAJ MAJ MIN DIM'.split(' ');
            const triads: Array<string> = [];
            for (let i = 0; i < ionianTriads.length; i++) {
                triads.push(ionianTriads[(i + offset) % ionianTriads.length]);
            }
            return triads;
        }

        /** Build a default step progression (offset 0: ionian) */
        private static defaultSteps(offset: number): Array<string> {
            const ionianStep = 'W W H W W W H'.split(' ');
            const steps: Array<string> = [];
            for (let i = 0; i < ionianStep.length; i++) {
                steps.push(ionianStep[(i + offset) % ionianStep.length]);
            }
            return steps;
        }

        /** Convert step (H, W, WH) to semitones */
        private static Semitones(steps: Array<string>): Array<number> {
            const result: Array<number> = [];
            for (const step of steps) {
                let inc = 0;
                switch (step) {
                    case 'H': inc = 1; break;
                    case 'W': inc = 2; break;
                    case 'WH':
                    case 'HW': inc = 3; break;
                }
                result.push(inc);
            }
            return result;
        }

        /** Build a default mode, derived from ionian (by offset) */
        static buildDefaultMode(offset: number): Mode {
            return new Mode(TraditionalModes[offset],
                Mode.defaultSteps(offset),
                Mode.defaultTriads(offset),
                true,
                offset !== 0);
        }

        /** Return mode definition based on it's name */
        static fromName(name: string) {
            return ModeMap[name.toLowerCase()];
        }

        /** Return list of supported modes */
        static Names() {
            return Object.keys(ModeMap);
        }

        /** Build a new instance */
        constructor(
            public name: string,
            public step: Array<string>,
            public triads: Array<string>,
            public traditional?: boolean,
            public traditionalDerived?: boolean) {
            this.semitones = Mode.Semitones(step);
        }

        /** Return chords from the mode, based on provided root */
        Chords(root: Notes.Note): Array<Chords.Chord> {
            const chords: Array<Chords.Chord> = [
                new Chords.Chord(root,
                    Chords.Triads.byName(this.triads[0]), 1)
            ];
            for (let i = 1, inc = 0; i < this.semitones.length; ++i) {
                inc += this.semitones[i - 1];
                chords.push(
                    new Chords.Chord(
                        root.addSemitones(inc),
                        Chords.Triads.byName(this.triads[i]),
                        i + 1));
            }
            return chords;
        }
    }

    /** Helper for tracking note as set */
    interface ModeMap { [k: string]: Mode; }

    /**  Map of all modes */
    const ModeMap = function (): ModeMap {
        const m: ModeMap = {};
        // Default modes
        for (let i = 0; i < TraditionalModes.length; ++i) {
            m[TraditionalModes[i]] = Mode.buildDefaultMode(i);
        }
        // Melodic Minor
        m['melodic'] = new Mode('melodic',
            'W H W W W W H'.split(' '),
            'MIN MIN AUG MAJ MAJ DIM DIM'.split(' '));
        // Harmonic Minor
        m['harmonic'] = new Mode('harmonic',
            'W H W W H WH H'.split(' '),
            'MIN DIM AUG MIN MAJ MAJ DIM'.split(' '));

        return m;
    }();
}
