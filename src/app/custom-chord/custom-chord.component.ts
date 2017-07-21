import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChangeEvent as InputChangeEvent } from '../chord-input/chord-input.component';

export class ChangeEvent {
  constructor(public id: string,
    public tab: string,
    public removed: boolean) { }
}

@Component({
  selector: 'app-custom-chord',
  templateUrl: './custom-chord.component.html',
  styleUrls: ['./custom-chord.component.css']
})
export class CustomChordComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() tab: string;

  update: InputChangeEvent;

  @Output() onChange = new EventEmitter<ChangeEvent>();
  constructor() { }

  ngOnInit() {
    this.update = new InputChangeEvent(undefined, undefined, this.tab);
  }

  remove() {
    this.onChange.emit(new ChangeEvent(this.id, this.tab, true));
  }

  updateChord() {
    this.onChange.emit(new ChangeEvent(this.id, this.update.tab, false));
  }

  tabChange(evt: InputChangeEvent) {
    this.update = evt;
  }
}
