import { Error } from 'tslint/lib/error';
export namespace Progressions {
    enum triadType {
        MAJ,
        MIN,
        DIM,
        AUG
    }

    const RomanNumeral = [
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII'];

    /**
     * Progression class
     */
    export class Progression {
        progressionAsString: Array<string>;
        progressionAsNumber: Array<number> = [];
        triads: Array<string> = [];

        /** Convert a progression number to matching numeral */
        static NumeralByValueAndTriad(value: number, triad: string): string {
            const numeral = RomanNumeral[value];
            if (triad === triadType[triadType.MIN]) {
                return numeral.toLowerCase();
            }
            // def to maj
            return numeral.toUpperCase();
        }

        /** Build a progression based on a string */
        constructor(progression: string) {
            this.progressionAsString = progression.split(/\ |,/);
            for (const number of this.progressionAsString) {
                let i = 1;
                for (; i < RomanNumeral.length && RomanNumeral[i].toLowerCase() !== number.toLowerCase(); ++i) {
                    // No action
                }
                if (i > RomanNumeral.length) {
                    throw new Error('Could not convert ' + number + ' from ' + progression);
                }
                this.progressionAsNumber.push(i);
                // Only major/minor for now: roman are uppercase - if match => major
                if (number === RomanNumeral[i]) {
                    this.triads.push(triadType[triadType.MAJ]);
                } else if (number === RomanNumeral[i].toLowerCase()) {
                    this.triads.push(triadType[triadType.MIN]);
                } else {
                    this.triads.push(undefined);
                }
            }
        }
    }

    export const ProgressionsList: Array<Progression> = function (progressions: Array<string>): Array<Progression> {
        const result: Array<Progression> = [];
        for (const progression of progressions) {
            result.push(new Progression(progression));
        }
        return result;
    }([
        'I V IV',
        'I vi IV V',
        'iv III II I',
        'ii VII I',
        'vi ii V I',
        'ii V I',
        'V III',
        'I IV ii',
        'I V vi iii IV I IV V',
        'i VII i V III VII i V i',
        'I IV I V I IV I V I',
        'I V vi IV',
        'III VII i V III VII i V i',
        'I vi ii V'
    ]);
}
