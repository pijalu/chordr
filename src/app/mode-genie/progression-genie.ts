import { LocalStorageService } from 'angular-2-local-storage';

import { Progressions } from '../../engine/progressions';
import { Modes } from '../../engine/modes';
import { Chords } from '../../engine/chords';
import { Notes } from '../../engine/notes';
import { StringSet } from '../../utils/string-set';
import { StringMap } from '../../utils/string-map';

import { Chord as InputChord } from './mode-genie.component';

/** Resulting chords */
export class OutputChord {
    constructor(public name: string, public type: string, public numeral: string, public played?: boolean) { }
}

/** Resulting progression */
export class OutputProgression {
    score = 0;
    type: string;
    progressionName: string;
    chords: Array<OutputChord> = [];

    constructor(public root: string, public modeName: string, chords?: Array<OutputChord>) {
        if (chords) {
            this.chords = chords;
        }
    }
}

const traditionalModeSteps = Modes.Mode.Semitones(Modes.Mode.defaultSteps(0));

/** Store precalculate proggression information */
class ProgressionData {
    root: Notes.Note;
    mode: Modes.Mode;
    chords: Array<Chords.Chord>;
    chordsMap: StringMap<Chords.Chord>;
    numeralMap: StringMap<Chords.Chord>;
    progressions: Array<Progressions.Progression>;

    constructor(public rootName: string,
        public modeName: string) {
        this.root = new Notes.Note(rootName);
        this.mode = Modes.Mode.fromName(modeName);
        this.chords = this.mode.Chords(this.root);
        this.chordsMap = new StringMap<Chords.Chord>();
        this.numeralMap = new StringMap<Chords.Chord>();
        for (const chord of this.chords) {
            this.chordsMap.put(chord.NameAndType().toUpperCase(), chord);
            this.numeralMap.put(Progressions.Progression.NumeralByValueAndTriad(
                chord.numeralInProgression,
                chord.triad.name),
                chord);
        }
        // Add matching progressions
        this.progressions = [];
        for (const progression of Progressions.ProgressionsList) {
            const length = progression.progressionAsString.length;
            let i = 0;
            for (; i < length
                && this.numeralMap.contains(progression.progressionAsString[i]);
                i++) {
                // Do nothing, just loop
            }
            if (i === length) {
                this.progressions.push(progression);
                // console.log('Precalc: adding ' + progression.progression + ' for root ' + rootName + ' mode ' + modeName, progression);
            } else {
                // console.log('Precalc: skipping ' + progression.progression + ' for root ' + rootName + ' mode ' + modeName, progression);
            }
        }
        // console.log('Added ' + this.progressions.length + ' progressions for root ' + rootName + ' mode ' + modeName);
    }
}

/* Score notes
    - If same order has provided chord - more points
*/
export class ProgressionGenie {
    private static progressionData: StringMap<ProgressionData>;

    /** preload progression data */
    static preCalculate() {
        if (this.progressionData) {
            this.progressionData = ProgressionGenie.getCalculationData();
        }
    }

    /** Return calculatio data - building as needed */
    private static getCalculationData(): StringMap<ProgressionData> {
        if (!this.progressionData) {
            console.log('Building initial calculation data');
            this.progressionData = new StringMap<ProgressionData>();
            for (const root of Notes.NoteName) {
                for (const mode of Modes.Mode.Names()) {
                    const dataKey = root + ' ' + mode;
                    this.progressionData.put(dataKey,
                        new ProgressionData(root, mode));
                    console.log('Precalc: Added data for ' + dataKey);
                }
            }
            console.log('Done building Initial calculation data');
        }
        return this.progressionData;
    }

    /** Build proposed progression based on inputChords */
    static build(chords: Array<InputChord>, disabledModes: StringSet, skipPattern: boolean): Array<OutputProgression> {
        if (chords.length === 0) {
            return [];
        }
        const results: Array<OutputProgression> = [];
        for (const data of this.getCalculationData().values()) {
            // Filter derived as they will be included when processing traditional source (ionian)
            if (!data.mode.traditionalDerived) {
                for (const progression of ProgressionGenie.buildByProgressionData(
                    data,
                    chords,
                    disabledModes,
                    skipPattern)) {
                    results.push(progression);
                }
            }
        }
        return results.sort((a, b) => {
            if (a.score !== b.score) {
                // inverse
                return b.score - a.score;
            }
            const strA = a.root + a.modeName;
            const strB = b.root + b.modeName;
            if (strA < strB) {
                return -1;
            } else if (strA > strB) {
                return 1;
            }
            return 0;
        });
    }

    /** Count matches from the proposed progression chords */
    private static countMatches(progressionChords: StringMap<Chords.Chord>,
        inputChords: Array<InputChord>): number {
        let matches = 0;
        for (const chord of inputChords) {
            if (progressionChords.contains((chord.name + ' ' + chord.type).toUpperCase())) {
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
                noteSet.contains((chord.Name() + ' ' + chord.Type()).toUpperCase()));
            i++;
            result.push(oc);
        }
        return result;
    }

    private static reorderChordsForTraditionalDerivedMode(chords: Array<OutputChord>, offset: number): Array<OutputChord> {
        const result: Array<OutputChord> = [];
        for (let i = 0; i < chords.length; i++) {
            const chord = chords[(i + offset) % chords.length];
            result.push(new OutputChord(
                chord.name,
                chord.type,
                Progressions.Progression.NumeralByValueAndTriad(i + 1, chord.type),
                chord.played));
        }
        return result;
    }

    /** Check and build a proposal based on a root/mode precalculated data */
    private static buildByProgressionData(data: ProgressionData,
        chords: Array<InputChord>,
        disabledModes: StringSet,
        skipPattern: boolean): Array<OutputProgression> {
        // If we don't match all the input chord, we can stop now
        const matches = ProgressionGenie.countMatches(data.chordsMap, chords);
        if (matches < chords.length) {
            // console.log('Short cut', data.rootName, data.modeName, matches, data.chordsSet, chords);
            return [];
        }

        const progressionChords = ProgressionGenie.buildOutputChordsFromModeChords(
            data.chords,
            chords);
        const progression = new OutputProgression(
            data.rootName,
            data.modeName,
            progressionChords);

        // Favor progression starting with same first chord
        if (chords[0].name === progressionChords[0].name) {
            progression.score += 10;
        }

        const results: Array<OutputProgression> = [];

        // Check we don't skip this mode - note: Calculation still need to occurs for sub modes !
        if (!disabledModes.contains(data.modeName)) {
            results.push(progression);
            if (!skipPattern) {
                ProgressionGenie.addKnownProgression(results, progression, chords, data);
            }
        } else {
            console.log('Skipping (partial)', data.modeName);
        }

        // We are in a traditional ionian: we can add all derived modes
        if (data.mode.traditional
            && data.mode.name === Modes.TraditionalModes[0]) {

            for (let offset = 1, semitones = traditionalModeSteps[offset - 1];
                offset < Modes.TraditionalModes.length;
                offset++ , semitones += traditionalModeSteps[offset - 1]) {
                const modeName = Modes.TraditionalModes[offset];
                if (disabledModes.contains(modeName)) {
                    console.log('Skipping', modeName);
                    continue;
                }
                const rootName = data.root.addSemitones(semitones).name();

                const reorderedProgressionChords = this.reorderChordsForTraditionalDerivedMode(progressionChords, offset);
                const reorderedProgression = new OutputProgression(
                    rootName,
                    modeName,
                    reorderedProgressionChords);
                // Favor progression starting with same first chord
                if (chords[0].name === reorderedProgressionChords[0].name) {
                    reorderedProgression.score += 10;
                }

                results.push(reorderedProgression);

                const dataKey = rootName + ' ' + modeName;
                const newModeData = ProgressionGenie.getCalculationData().get(dataKey);
                // console.log('Getting new mode data', dataKey, newModeData);
                if (!skipPattern) {
                    ProgressionGenie.addKnownProgression(results,
                        reorderedProgression,
                        chords,
                        newModeData);
                }
            }
        }
        return results;
    }

    private static addKnownProgression(results: Array<OutputProgression>,
        progression: OutputProgression,
        playedChords: Array<InputChord>,
        data: ProgressionData) {
        const presentChords = new StringMap<OutputChord>();
        progression.chords.forEach((c) => presentChords.put(c.numeral, c));

        for (const possibleProgression of data.progressions) {
            const candidate = new OutputProgression(progression.root, progression.modeName);
            candidate.progressionName = possibleProgression.progressionAsString.join(' ');
            candidate.chords = [];
            // Score short progression first
            candidate.score = (100 - possibleProgression.progressionAsNumber.length) * 100;

            // build and count matches
            const playedMatchesCount = new StringSet();
            let hasMissingChord = false;
            for (const numeral of possibleProgression.progressionAsString) {
                const chord = presentChords.get(numeral);
                if (chord === undefined) {
                    hasMissingChord = true;
                    break;
                }
                candidate.chords.push(chord);
                if (chord.played) {
                    playedMatchesCount.add(chord.name + chord.type);
                }
            }
            if (!hasMissingChord
                && playedMatchesCount.size() === playedChords.length) {
                // Favor candidate with same first note
                if (playedChords[0].name === candidate.chords[0].name) {
                    candidate.score += 10;
                }
                results.push(candidate);
            }
        }
    }
}
