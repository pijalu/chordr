
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
});
