import { Modes } from './modes';
import { Chords } from './chords';
import { Notes } from './notes';

import { expect } from 'chai';

describe('Mode class', () => {
    it('should contains ionian mode within names', () => {
        const modeName = 'ionian';
        const name = Modes.Mode.Names().find((n) => {
            return n === modeName;
        });
        expect(name).to.equal(modeName);
    });

    it('should contains ionian mode', () => {
        const modeName = 'ionian';
        const mode = Modes.Mode.fromName(modeName.toUpperCase());
        expect(mode.name).to.equal(modeName);
    });

    it('should make ionian a traditional mode but not derivated', () => {
        const modeName = 'ionian';
        const mode = Modes.Mode.fromName(modeName.toUpperCase());
        expect(mode.traditional).to.equal(true);
        expect(mode.traditionalDerived).to.equal(false);
    });

    it('should make lydian a traditional mode and derivated', () => {
        const modeName = 'lydian';
        const mode = Modes.Mode.fromName(modeName.toUpperCase());
        expect(mode.traditional).to.equal(true);
        expect(mode.traditionalDerived).to.equal(true);
    });

    it('for C ionian should contains expected chord', () => {
        const modeName = 'ionian';
        const mode = Modes.Mode.fromName(modeName.toUpperCase());
        const chords = mode.Chords(new Notes.Note('C'));
        expect(Chords.Chord.toString(chords)).to.equal('C MAJ,D MIN,E MIN,F MAJ,G MAJ,A MIN,B DIM');
    });

    it('for C lid should contains expected chord', () => {
        const modeName = 'ionian';
        const mode = Modes.Mode.fromName(modeName.toUpperCase());
        const chords = mode.Chords(new Notes.Note('C'));
        expect(Chords.Chord.toString(chords)).to.equal('C MAJ,D MIN,E MIN,F MAJ,G MAJ,A MIN,B DIM');
    });
});
