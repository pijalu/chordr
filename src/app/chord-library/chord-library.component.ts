import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../chord/chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

import { ActivatedRoute } from '@angular/router';

class Chord {
  static ids = 0;

  id: string;
  numericId: number;
  tab: string;

  static reset() {
    Chord.ids = 0;
  }

  constructor(public root: string, public type: string, public variation: number) {
    this.id = 'chord_' + Chord.ids;
    this.numericId = Chord.ids;
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

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const routeParam = <string>this.route.snapshot.queryParams['chords'];
    if (!routeParam) {
      this.loadChordFromStorage();
    } else {
      try {
        this.chords = [];
        routeParam.split(',').forEach((c) => {
          const chord = c.split(' ');
          this.chords.push(new Chord(chord[0].toUpperCase(), chord[1].toLowerCase(), 0));
        });
        this.chords.push(new Chord(undefined, undefined, undefined));
        this.localStorageService.set(chordsStorageKey, this.chords);
      } catch (err) {
        console.error('Failed to load chords', err);
        this.clear();
      }
    }
  }

  loadChordFromStorage() {
    this.chords = this.localStorageService.get(chordsStorageKey);
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
      // Add
      new Chord(undefined, undefined, undefined)
    ];
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  onChange(evt: ChangeEvent) {
    if (evt.removed) {
      this.chords = this.chords.filter(c => c.id !== evt.id);
    } else {
      for (const chord of this.chords) {
        if (chord.id === evt.id) {
          if (chord.numericId === (Chord.ids - 1)) {
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
