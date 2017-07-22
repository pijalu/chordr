import { Error } from 'tslint/lib/error';
export namespace Progressions {
    enum triadType {
        MAJ,
        MIN,
        DIM,
        AUG
    }

    const romanNumeral = [
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
        progressionAsString: string;
        progressionAsNumber: Array<number> = [];
        triads: Array<string> = [];

        /** Build a progression based on a string */
        constructor(progression: string) {
            this.progressionAsString = progression;
            for (const number of this.progressionAsString.split(/\ |,/)) {
                let i = 1;
                for (; i < romanNumeral.length && romanNumeral[i].toLowerCase() !== number.toLowerCase(); ++i) {
                    // No action
                }
                if (i > romanNumeral.length) {
                    throw new Error('Could not convert ' + number + ' from ' + progression);
                }
                this.progressionAsNumber.push(i);
                // Only major/minor for now: roman are uppercase - if match => major
                if (number === romanNumeral[i]) {
                    this.triads.push(triadType[triadType.MAJ]);
                } else if (number === romanNumeral[i].toLowerCase()) {
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
