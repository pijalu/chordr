import { Component, OnInit , OnChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';


import { Progressions } from '../../engine/progressions';
import { Chords as ChordEngine } from '../../engine/chords';
import { Modes } from '../../engine/modes';
import { Fretboards } from '../../engine/fretboards';
import { Notes } from '../../engine/notes';

import { ChordService } from '../chord.service';

export class Chord {
  static ids = 0;

  id: string;
  numericId: number;

  static reset() {
    Chord.ids = 0;
  }

  constructor(public name: string, public type: string, public variation: number, public tab: string, public numeral: string) {
    this.id = 'chord_' + Chord.ids;
    this.numericId = Chord.ids;
    Chord.ids++;
  }
}


const chordsStorageKey = 'ModeExplorerComponent_chords';
const rootStorageKey = 'ModeExplorerComponent_root';
const modeStorageKey = 'ModeExplorerComponent_mode';

@Component({
  selector: 'app-mode-explorer',
  templateUrl: './mode-explorer.component.html',
  styleUrls: ['./mode-explorer.component.css'],
  providers: [ChordService]
})
export class ModeExplorerComponent implements OnInit, OnChanges {
  chords: Array<Chord>;

  selectedRoot: string;
  selectedMode: string;

  constructor(private localStorageService: LocalStorageService,
    private chordService: ChordService,
    private route: ActivatedRoute,
    private router: Router) {

    this.selectedRoot = this.localStorageService.get(rootStorageKey);
    this.selectedMode = this.localStorageService.get(modeStorageKey);
    this.chords = this.localStorageService.get(chordsStorageKey);
  }

  loadQueryParams() {
    const queryRoot = this.route.snapshot.queryParams['root'];
    const queryMode = this.route.snapshot.queryParams['mode'];

    console.log('query param', queryRoot, queryMode);

    if (queryRoot !== undefined && queryMode !== undefined
      && (queryRoot !== this.selectedRoot || queryMode !== this.selectedMode)) {
      this.selectedRoot = queryRoot;
      this.selectedMode = queryMode;

      this.localStorageService.set(rootStorageKey, this.selectedRoot);
      this.localStorageService.set(modeStorageKey, this.selectedMode);
      this.buildChordList();
    }
  }

  ngOnInit() {
    this.loadQueryParams();
  }

  ngOnChanges() {
  }

  Roots(): Array<string> {
    return Notes.NoteName;
  }

  Modes(): Array<string> {
    return Modes.Mode.Names();
  }

  onRootChange(newRoot: string) {
    this.localStorageService.set(rootStorageKey, newRoot);
    this.buildChordList();
  }

  onModeChange(newMode: string) {
    this.localStorageService.set(modeStorageKey, newMode);
    this.buildChordList();
  }

  onChordChange(chord: Chord) {
    // Store chord update
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  buildChordList() {
    if (!this.selectedMode
      || !this.selectedRoot) {
      return;
    }

    this.chords = [];
    for (const chord of Modes.Mode
      .fromName(this.selectedMode)
      .Chords(new Notes.Note(
        this.selectedRoot))) {
      this.chords.push(
        new Chord(
          chord.Name(),
          chord.Type(),
          0,
          this.chordService.Variations(chord.Name(), chord.Type().toLowerCase(), 0).join(','),
          Progressions.Progression.NumeralByValueAndTriad(
            chord.numeralInProgression,
            chord.Type())));
    }
    this.localStorageService.set(chordsStorageKey, this.chords);
  }

  editChord(chord: Chord) {
    console.log('TODO');
  }
}
