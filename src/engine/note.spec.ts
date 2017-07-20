import { Notes } from './note';

import { expect } from 'chai';

describe('Note class', () => {
  it('should be C is build without param', () => {
    const note = new Notes.Note();
    expect(note.name()).to.equal('C');
  });

  it('should build a note based on provided name', () => {
    const note = new Notes.Note('G#');
    expect(note.name()).to.equal('G#');
  });

  it('should support semitone increment', () => {
    const I = new Notes.Note('A');
    const II = I.addSemitones(1);
    const III = II.addSemitones(1);

    expect(I.name()).to.equal('A');
    expect(II.name()).to.equal('A#');
    expect(III.name()).to.equal('B');
  });

  it('should parse a serie of notes and correctly print them', () => {
    const input = 'A A# G';
    const notes: Array<Notes.Note> = Notes.Note.asNotes(input);
    expect(Notes.Note.Names(notes)).to.equal(input);
  });

});
