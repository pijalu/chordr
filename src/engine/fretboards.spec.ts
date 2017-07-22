import { Fretboards } from './fretboards';
import { Notes } from './notes';

import { expect } from 'chai';

describe('Fretboard class', () => {
  it('Fretboard returns expected notes', () => {
    const fretboard = Fretboards.Fretboard.From('E');
    expect(Notes.Note.Names(fretboard.asNotes('0 0 0 0 0 0'))).to.equal(Fretboards.Tunings['E']);
  });

  it('Fretboard tab returns expected notes', () => {
    const fretboard = Fretboards.Fretboard.From('E');
    const notes = fretboard.asNotes('0 2 2 1 0 0');
    expect(Notes.Note.Names(notes)).to.equal('E B E G# B E');
  });

});
