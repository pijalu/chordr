import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChordService } from '../chord.service';

class ChordVariationData {
  constructor(public label: string, public tab: string, public variation: number) { }
}

export class ChangeEvent {
  constructor(public id: string,
    public root: string,
    public type: string,
    public variation: number,
    public tab: string,
    public removed: boolean) { }
}

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  providers: [ChordService]
})
export class ChordComponent implements OnInit {
  @Input() id: string;

  @Input() root: string;

  @Input() type: string;

  @Input() variation: number;

  @Output() onChange = new EventEmitter<ChangeEvent>();

  // Select items
  selectedRoot: string;
  availableType: Array<string>;
  selectedType: string;
  availableVariation: Array<ChordVariationData>;

  tab: string;

  constructor(private chordService: ChordService) {
  }

  ngOnInit() {
    this.tab = this.chordService.Variations(this.root, this.type, this.variation).join(',');
    this.resetSelected();
  }

  resetSelected() {
    this.selectedRoot = this.root;
    this.selectedType = this.type;
    this.onTypeChange(this.selectedType);
  }

  onRootChange(newRoot: string) {
    this.availableType = this.chordService.Types(newRoot);
    this.selectedType = this.availableType[0];
    this.onTypeChange(this.selectedType);
  }

  onTypeChange(newType: string) {
    this.availableVariation = [];

    const nbVariation = this.chordService.VariationsCount(this.selectedRoot, newType);
    for (let i = 0; i < nbVariation; ++i) {
      const variation = this.chordService.Variations(this.selectedRoot, this.selectedType, i - 1);
      if (variation) {
        this.availableVariation.push(
          new ChordVariationData(this.selectedRoot + ' ' + this.selectedType,
            variation.join(','),
            i - 1));
      }
    }
  }

  selectChord(root: string, type: string, variation: number) {
    this.root = root;
    this.type = type;
    this.variation = variation;
    this.tab = this.chordService.Variations(this.root, this.type, this.variation).join(',');

    this.onChange.emit(new ChangeEvent(this.id, this.root, this.type, this.variation, this.tab, false));
  }

  remove() {
    this.onChange.emit(new ChangeEvent(this.id, this.root, this.type, this.variation, this.tab, true));
  }

  Roots(): Array<string> {
    return this.chordService.Roots();
  }

  Types(root: string): Array<string> {
    return this.chordService.Types(root);
  }
}
