import { Fretboard } from './fretboard';
import { Notes } from './note';

import { expect } from 'chai';

describe('Fretboard class', () => {
  it('Fretboard returns expected notes', () => {
    const fretboard = Fretboard.Fretboard.From('E');
    expect(Notes.Note.Names(fretboard.asNotes())).to.equal(Fretboard.Tunings['E']);
  });

  it('Fretboard tab returns expected notes', () => {
    const fretboard = Fretboard.Fretboard.From('E');
    const notes = fretboard.asNotes('0 2 2 1 0 0');
    expect(Notes.Note.Names(notes)).to.equal('E B E G# B E');
  });

});
