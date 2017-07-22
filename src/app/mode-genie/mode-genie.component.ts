import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../custom-chord/custom-chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

import { Chords as ChordEngine } from '../../engine/chords';
import { Fretboards } from '../../engine/fretboards';
import { Notes } from '../../engine/notes';

class Chord {
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
  styleUrls: ['./mode-genie.component.css']
})
export class ModeGenieComponent implements OnInit {
  public chords: Array<Chord> = [];

  constructor(private localStorageService: LocalStorageService) {
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

  onChange(event: ChangeEvent) {
    if (event.removed) {
      this.chords = this.chords.filter(c => c.id !== event.id);
    } else {
      for (const chord of this.chords) {
        if (chord.id === event.id) {
          if (chord.numericId === Chord.ids - 1) {
            this.chords.push(new Chord());
          }
          chord.tab = event.tab;
          try {
            this.evaluate(chord);
          } catch (e) {
            console.log('Error during evaluation', e);
          }
        }
      }
    }
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  evaluate(c: Chord) {
    const fretboard = Fretboards.Fretboard.From('E');
    const notes = fretboard.asNotes(c.tab);
    const result = ChordEngine.Chord.fromNotes(notes);
    if (result !== undefined) {
      c.name = result.Name();
      c.type = result.Type().toLowerCase();
    }
  }
}
