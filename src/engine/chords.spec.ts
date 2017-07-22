import { Chords } from './chords';
import { Fretboards } from './fretboard';
import { Notes } from './note';

import { expect } from 'chai';

describe('Chord class', () => {
    const chordTests = (() => {
        interface TestItem {
            tuning: string;
            tab: string;
            expectedChord: string;
        }
        const testItems: Array<TestItem> = [
            {
                tuning: 'E',
                tab: '0 2 2 1 0 0',
                expectedChord: 'E MAJ',
            },
            {
                tuning: 'E',
                tab: '12 14 14 x x x',
                expectedChord: 'E MAJ',
            },
            {
                tuning: 'E',
                tab: '0 3 2 0 1 0',
                expectedChord: 'C MAJ',
            },
            {
                tuning: 'E',
                tab: '5 7 7 5 5 5',
                expectedChord: 'A MIN',
            }
        ];
        for (const testItem of testItems) {
            const fretboard = Fretboards.Fretboard.From(testItem.tuning);
            const notes = fretboard.asNotes(testItem.tab);
            const chord = Chords.Chord.fromNotes(notes);

            it('Chord evaluates correctly notes for [' + testItem.tab + '] as [' + testItem.expectedChord + ']', () => {
                expect(chord.NameAndType()).to.equal(testItem.expectedChord);
            });
        }
    })();

    it('Chord evaluates correctly notes', () => {
        interface TestItem {
            tuning: string;
            tab: string;
            expectedChord: string;
        }

        const testItems: Array<TestItem> = [
            {
                tuning: 'E',
                tab: '0,2,2,1,0,0',
                expectedChord: 'E MAJ',
            },
            {
                tuning: 'E',
                tab: '12 14 14 x x x',
                expectedChord: 'E MAJ',            },
        ];

        for (const testItem of testItems) {
            const fretboard = Fretboards.Fretboard.From(testItem.tuning);
            const notes = fretboard.asNotes(testItem.tab);
            const chord = Chords.Chord.fromNotes(notes);

            expect(chord.NameAndType()).to.equal(testItem.expectedChord);
        }
    });

});
