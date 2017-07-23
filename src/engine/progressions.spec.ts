
import { Progressions } from './progressions';
import { Notes } from './notes';

import { expect } from 'chai';

describe('Progressions classes', () => {
    it('is populated', () => {
        const progressionCnt = Progressions.ProgressionsList.length;
        expect(progressionCnt).to.be.above(0);
    });

    it('contains I V vi IV', () => {
        const progression = Progressions.ProgressionsList.find((t) => {
            return t.progressionAsString === 'I V vi IV';
        });
        expect(progression.progressionAsString).to.be.equal('I V vi IV');
    });

    it('has correct numbers for I V vi IV', () => {
        const progression = Progressions.ProgressionsList.find((t) => {
            return t.progressionAsString === 'I V vi IV';
        });
        expect(progression.progressionAsNumber).to.be.deep.equal([1, 5, 6, 4]);
    });

    it('has correct triads for I V vi IV', () => {
        const progression = Progressions.ProgressionsList.find((t) => {
            return t.progressionAsString === 'I V vi IV';
        });
        expect(progression.triads).to.be.deep.equal(['MAJ', 'MAJ', 'MIN', 'MAJ']);
    });

    const numeralTests = (() => {
        interface TestItem {
            inputNumber: number;
            inputTriad: string;
            expectedOutput: string;
        }

        const testItems: Array<TestItem> = [
            {
                inputNumber: 1,
                inputTriad: 'MAJ',
                expectedOutput: 'I',
            },
            {
                inputNumber: 1,
                inputTriad: 'MIN',
                expectedOutput: 'i',
            },
            {
                inputNumber: 7,
                inputTriad: 'MIN',
                expectedOutput: 'vii',
            },
            {
                inputNumber: 7,
                inputTriad: 'DIM',
                expectedOutput: 'VII',
            },
        ];
        for (const testItem of testItems) {
            it('returns numeral ' + testItem.expectedOutput
                + ' for chord ' + testItem.inputNumber
                + ' triad ' + testItem.inputTriad, () => {
                const actual = Progressions.Progression.NumeralByValueAndTriad(testItem.inputNumber, testItem.inputTriad);
                expect(actual).to.be.equal(testItem.expectedOutput);
            });
        }
    })();
});
