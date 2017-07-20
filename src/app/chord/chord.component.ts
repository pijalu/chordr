import { Component, OnInit, Input } from '@angular/core';
import { ChordService } from '../chord.service';
import { FormsModule } from '@angular/forms';

class ChordVariationData {
  constructor(public label: string, public tab: string, public variation: number) {}
}

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  providers: [ChordService]
})
export class ChordComponent implements OnInit {
  @Input() root: string;

  @Input() type: string;

  @Input() variation: number;

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
    console.log('We change to ', root, type, variation);
    this.root = root;
    this.type = type;
    this.variation = variation;
    this.tab = this.chordService.Variations(this.root, this.type, this.variation).join(',');
  }

  Roots(): Array<string> {
    return this.chordService.Roots();
  }

  Types(root: string): Array<string> {
    return this.chordService.Types(root);
  }
}
