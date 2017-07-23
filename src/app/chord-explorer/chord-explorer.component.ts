import { OnChange } from 'ngx-bootstrap/ng2-bootstrap';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Chord } from '../mode-explorer/mode-explorer.component';

import { ChordService } from '../chord.service';

class Variation {
  constructor(public name: string, public type: string, public variation: number, public tab: string) {
  }
}

@Component({
  selector: 'app-chord-explorer',
  templateUrl: './chord-explorer.component.html',
  styleUrls: ['./chord-explorer.component.css']
})
export class ChordExplorerComponent implements OnInit, OnChanges {
  @Input()
  chord: Chord;

  @Output()
  onChange = new EventEmitter<Chord>();

  type: string;

  variations: Array<Variation>;

  constructor(private chordService: ChordService) { }

  ngOnInit() {
    this.type = this.chord.type.toLowerCase();
    this.buildVariations();
  }

  ngOnChanges() {
  }

  onTypeChange(type: string) {
    this.buildVariations();
  }

  /** Retrieve types that match a given type (fuzzy match) */
  Types(): Array<string> {
    return this.chordService.Types(this.chord.name).filter((t) => t.toLowerCase().includes(this.chord.type.toLowerCase()));
  }

  selectChord(v: Variation) {
    this.chord.name = v.name;
    this.chord.type = v.type;
    this.chord.tab = v.tab;
    this.chord.variation = v.variation;

    this.onChange.emit(this.chord);
  }

  buildVariations() {
    this.variations = [];
    const variationCnt = this.chordService.VariationsCount(this.chord.name, this.type);
    for (let variation = 0; variation < variationCnt; variation++) {
      const tab = this.chordService.Variations(this.chord.name, this.type, variation).join(',');
      this.variations.push(new Variation(this.chord.name, this.type, variation, tab));
    }
  }
}
