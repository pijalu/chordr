import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

declare var Raphael: any;

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css']
})
export class ChordComponent implements OnInit, AfterViewInit {
  static ids = 0;

  @Input() name: string;

  @Input()
  variation: number;

  containerId: string;

  constructor() {
    ChordComponent.ids++;
    this.containerId = 'appChord' + ChordComponent.ids;
  }

  ngAfterViewInit() {
    Raphael.chord(this.containerId, this.name, Number(this.variation));
  }

  ngOnInit() {}

}
