import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../custom-chord/custom-chord.component';

import { LocalStorageService } from 'angular-2-local-storage';

class Chord {
  static ids = 0;
  id: string;

  constructor(public name: string, public tab: string) {
    this.id = 'chorddata_' + Chord.ids;
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
  }

  clear() {
    this.chords = [
      new Chord(undefined, undefined)
    ];
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  ngOnInit() {
  }

  onChange(event: ChangeEvent) {
    console.log('change', event);
    if (event.removed) {
      this.chords = this.chords.filter(c => c.id !== event.id);
    } else {
      for (const chord of this.chords) {
        if (chord.id === event.id) {
          if (chord.tab === undefined) {
            this.chords.push(new Chord(undefined, undefined));
          }
          chord.tab = event.tab;
        }
      }
    }
  }
}
