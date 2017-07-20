import { Component, OnInit, Input } from '@angular/core';
import { ChordService } from '../chord.service';

declare var Raphael: any;

class ChordVariationData {
  constructor(public label: string, public tab: string) {}
}

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css'],
  providers: [ChordService]
})
export class ChordComponent implements OnInit {
  static ids = 0;

  @Input() root: string;

  @Input() type: string;

  @Input() variation: number;

  componentModalId: string;

  constructor(private chordService: ChordService) {
    ChordComponent.ids++;
    this.componentModalId = 'ChordComponentModal' + ChordComponent.ids;
  }

  ngOnInit() {}

  getTab(): string {
    return this.chordService.Variations(this.root, this.type, this.variation).join(',');
  }

  getVariations(): Array<ChordVariationData> {
    const variations: Array<ChordVariationData> = [];
    const maxVariation = this.chordService.VariationsCount(this.root, this.type);

    for (let i = 0 ; i < maxVariation; i++) {
      const variation = this.chordService.Variations(this.root, this.type, i - 1);
      if (variation) {
        variations.push(
          new ChordVariationData(this.root + ' ' + this.type,
          variation.join(',')));
      }
    }
    return variations;
  }
}
