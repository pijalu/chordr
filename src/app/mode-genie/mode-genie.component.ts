import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../custom-chord/custom-chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

class Chord {
  static ids = 0;

  id: string;
  numericId: number;

  static reset() {
    Chord.ids = 0;
  }

  constructor(public name: string, public tab: string) {
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
      new Chord(undefined, undefined)
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
            this.chords.push(new Chord(undefined, undefined));
          }
          chord.tab = event.tab;
        }
      }
    }
    this.localStorageService.set(chordsStorageKey, this.chords);
  }
}
