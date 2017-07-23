import { LocalStorageService } from 'angular-2-local-storage';

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

/** Store precalculate proggression information */
class ProgressionData {
    root: Notes.Note;
    mode: Modes.Mode;
    chords: Array<Chords.Chord>;
    chordsSet: StringSet;

    constructor(public rootName: string,
        public modeName: string) {
        this.root = new Notes.Note(rootName);
        this.mode = Modes.Mode.fromName(modeName);
        this.chords = this.mode.Chords(this.root);
        this.chordsSet = new StringSet();
        for (const chord of this.chords) {
            this.chordsSet.add(chord.NameAndType().toUpperCase());
        }
    }
}

/* Score notes
    - If same order has provided chord - more points
*/
export class ProgressionGenie {
    private static progressionData: Array<ProgressionData>;

    /** preload progression data */
    static preCalculate() {
        if (this.progressionData) {
            this.progressionData = ProgressionGenie.getCalculationData();
        }
    }

    /** Return calculatio data - building as needed */
    private static getCalculationData(): Array<ProgressionData> {
        if (!this.progressionData) {
            console.log('Building initial calculation data');
            this.progressionData = [];
            for (const root of Notes.NoteName) {
                for (const mode of Modes.Mode.Names()) {
                    this.progressionData.push(new ProgressionData(root, mode));
                }
            }
            console.log('Done building Initial calculation data');
        }
        return this.progressionData;
    }

    /** Build proposed progression based on inputChords */
    static build(chords: Array<InputChord>): Array<OutputProgression> {
        if (chords.length === 0) {
            return [];
        }
        const results: Array<OutputProgression> = [];
        for (const data of this.getCalculationData()) {
            for (const progression of ProgressionGenie.buildByProgressionData(
                    data,
                    chords)) {
                    results.push(progression);
            }
        }
        return results;
    }

    /** Count matches from the proposed progression chords */
    private static countMatches(progressionChords: StringSet,
        inputChords: Array<InputChord>): number {
        let matches = 0;
        for (const chord of inputChords) {
            if (progressionChords.exists((chord.name + ' ' + chord.type).toUpperCase())) {
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

    /** Check and build a proposal based on a root/mode precalculated data */
    private static buildByProgressionData(data: ProgressionData, chords: Array<InputChord>): Array<OutputProgression> {
        // If we don't match all the input chord, we can stop now
        const matches = ProgressionGenie.countMatches(data.chordsSet, chords);
        if (matches < chords.length) {
            // console.log('Short cut', data.rootName, data.modeName, matches, data.chordsSet, chords);
            return [];
        }

        const results: Array<OutputProgression> = [
            new OutputProgression(
                data.rootName,
                data.modeName,
                ProgressionGenie.buildOutputChordsFromModeChords(
                    data.chords,
                    chords))
        ];
        // TODO: More calc !
        return results;
    }
}
