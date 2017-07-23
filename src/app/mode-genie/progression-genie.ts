import { Set } from 'rxjs/util/Set';
import { Progressions } from '../../engine/progressions';
import { Modes } from '../../engine/modes';
import { Chords } from '../../engine/chords';
import { Notes } from '../../engine/notes';
import { StringSet } from '../../utils/string-set';

import { Chord as InputChord } from './mode-genie.component';

/** Resulting chords */
export class OutputChord {
    constructor(public name: string, public type: string, public numeral: string, public played?: boolean) { }
}

/** Resulting progression */
export class OutputProgression {
    score: number;
    type: string;
    chords: Array<OutputChord> = [];

    constructor(public root: string, public modeName: string, chords?: Array<OutputChord>) {
        if (chords) {
            this.chords = chords;
        }
    }
}

/* Score notes
    - If same order has provided chord - more points
*/



export class ProgressionGenie {
    static build(chords: Array<InputChord>): Array<OutputProgression> {
        if (chords.length === 0) {
            return [];
        }
        const results: Array<OutputProgression> = [];
        for (const root of Notes.NoteName) {
            for (const mode of Modes.Mode.Names()) {
                for (const progression of ProgressionGenie.buildForRootAndMode(
                    root,
                    Modes.Mode.fromName(mode),
                    chords)) {
                    results.push(progression);
                }
            }
        }
        return results;
    }

    private static countMatches(progressionChords: Array<Chords.Chord>, inputChords: Array<InputChord>): number {
        // Check if we matches all our played chords
        const noteSet = new StringSet();
        for (const chord of progressionChords) {
            noteSet.add((chord.Name() + ' ' + chord.Type()).toUpperCase());
        }
        let matches = 0;
        for (const chord of inputChords) {
            if (noteSet.exists((chord.name + ' ' + chord.type).toUpperCase())) {
                matches++;
            }
        }
        return matches;
    }

    /** Transform mode chords */
    private static buildOutputChordsFromModeChords(chords: Array<Chords.Chord>, inputChords: Array<InputChord>): Array<OutputChord> {
        const result: Array<OutputChord> = [];

        const noteSet = new StringSet();
        for (const chord of inputChords) {
            noteSet.add((chord.name + ' ' + chord.type).toUpperCase());
        }

        let i = 1;
        for (const chord of chords) {
            const oc = new OutputChord(
                chord.Name(),
                chord.Type(),
                Progressions.Progression.NumeralByValueAndTriad(i,
                    chord.Type()),
                noteSet.exists((chord.Name() + ' ' + chord.Type()).toUpperCase()));
            i++;
            result.push(oc);
        }
        return result;
    }

    private static buildForRootAndMode(root: string, mode: Modes.Mode, chords: Array<InputChord>): Array<OutputProgression> {
        const progressionChords = mode.Chords(new Notes.Note(root));

        // If we don't match all the input chord, we can stop now
        const matches = ProgressionGenie.countMatches(progressionChords, chords);
        if (matches < chords.length) {
            console.log('Short cut', root, mode, matches, Chords.Chord.toString(progressionChords), chords);
            return [];
        }

        const results: Array<OutputProgression> = [
            new OutputProgression(root, mode.name, ProgressionGenie.buildOutputChordsFromModeChords(progressionChords, chords))
        ];
        // TODO: More calc !
        return results;
    }
}
