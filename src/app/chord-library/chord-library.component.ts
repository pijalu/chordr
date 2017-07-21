import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../chord/chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

class Chord {
  static ids = 0;
  id: string;
  tab: string;

  constructor(public root: string, public type: string, public variation: number) {
    this.id = 'chord_' + Chord.ids;
    Chord.ids++;
  }
}

const chordsStorageKey = 'ChordLibraryComponent_chords';

@Component({
  selector: 'app-chord-library',
  templateUrl: './chord-library.component.html',
  styleUrls: ['./chord-library.component.css']
})
export class ChordLibraryComponent implements OnInit {
  chords: Array<Chord>;

  constructor(private localStorageService: LocalStorageService) {
    this.chords = localStorageService.get(chordsStorageKey);
    if (this.chords === null) {
      this.clear();
    }
  }

  ngOnInit() {
  }

  clear() {
    this.chords = [
      // Add
        new Chord(undefined, undefined, undefined)
      ];
      this.localStorageService.set(chordsStorageKey, this.chords);
  }

  onChange(evt: ChangeEvent) {
    if (evt.removed) {
      this.chords.filter(c => c.id !== evt.id);
    } else {
      for (const chord of this.chords) {
        if (chord.id === evt.id) {
          if (chord.root === undefined) {
            this.chords.push(new Chord(undefined, undefined, undefined));
          }
          chord.root = evt.root;
          chord.type = evt.type;
          chord.variation = evt.variation;
          chord.tab = evt.tab;
        }
      }
    }
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

}
