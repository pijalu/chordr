import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../custom-chord/custom-chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

import { Chords as ChordEngine } from '../../engine/chords';
import { Fretboards } from '../../engine/fretboards';
import { Notes } from '../../engine/notes';

import { OutputChord, OutputProgression, ProgressionGenie } from './progression-genie';

import { ChordService } from '../chord.service';

export class Chord {
  static ids = 0;

  id: string;
  numericId: number;

  static reset() {
    Chord.ids = 0;
  }

  constructor(public name?: string, public type?: string, public tab?: string) {
    this.id = 'chorddata_' + Chord.ids;
    // save numeric id
    this.numericId = Chord.ids;

    Chord.ids++;
  }
}


const chordsStorageKey = 'ModeGenieComponent_chords';

@Component({
  selector: 'app-mode-genie',
  templateUrl: './mode-genie.component.html',
  styleUrls: ['./mode-genie.component.css'],
  providers: [ChordService]
})
export class ModeGenieComponent implements OnInit {
  public chords: Array<Chord> = [];
  public progressions: Array<OutputProgression> = [];
  public calculating = false;

  constructor(private localStorageService: LocalStorageService, private chordService: ChordService) {
    this.chords = localStorageService.get(chordsStorageKey);
    if (this.chords === null) {
      this.clear();
    }
    // Fix Chords top id after reload
    this.chords.forEach(c => {
      if (c.numericId >= Chord.ids) {
        Chord.ids = c.numericId + 1;
      }
    });

    // Precalculate data now
    ProgressionGenie.preCalculate();

    // Calculate if we have restored data
    if (this.chords.length > 0) {
      this.calculateProgressions();
    }
  }

  clear() {
    Chord.reset();
    this.chords = [
      new Chord()
    ];
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  ngOnInit() {
  }

  /** A Chord was updated/removed */
  onChange(event: ChangeEvent) {
    if (event.removed) {
      this.chords = this.chords.filter(c => c.id !== event.id);
    } else {
      const chord = this.chords.find((c) => c.id === event.id);
      if (!chord) {
        console.error('Could not find chord !', chord);
        return;
      }

      if (chord.numericId === Chord.ids - 1) {
        this.chords.push(new Chord());
      }
      chord.tab = event.tab;
      try {
        this.evaluate(chord);
      } catch (e) {
        console.error('Evaluation error', e);
      }
    }
    this.localStorageService.set(chordsStorageKey, this.chords);
    this.calculateProgressions();
  }

  /** find general name/type of a given chord */
  evaluate(c: Chord) {
    const fretboard = Fretboards.Fretboard.From('E');
    const notes = fretboard.asNotes(c.tab);
    const result = ChordEngine.Chord.fromNotes(notes);
    if (result !== undefined) {
      c.name = result.Name();
      c.type = result.Type().toLowerCase();
    }
  }

  /** Calculate progression */
  calculateProgressions() {
    this.calculating = true;
    // Perform calc in a timeout to allow UI update/smother feelings
    setTimeout(() => {
      console.log('Start calculating...');
      this.progressions = ProgressionGenie.build(
        // Remove blank (new) chord
        this.chords.filter((c) => c.name !== undefined));
      console.log('Done calculating: found ' + this.progressions.length + ' progression(s)');
      this.calculating = false;
    }, 500);
  }

  /** convert a progression entry to a chord */
  tabify(chord: OutputChord): string {
    return this.chordService.Variations(chord.name, chord.type.toLowerCase(), 0).join(',');
  }

  /** Add a chord to played progression */
  addChord(chord: OutputChord) {
    if (chord.played) {
      return;
    }
    const emptyChord = this.chords[this.chords.length - 1];
    emptyChord.tab = this.tabify(chord);

    this.onChange(new ChangeEvent(emptyChord.id,
      emptyChord.tab,
      false));
  }
}
