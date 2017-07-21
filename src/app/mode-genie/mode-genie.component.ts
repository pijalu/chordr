import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '../chord-input/chord-input.component';

@Component({
  selector: 'app-mode-genie',
  templateUrl: './mode-genie.component.html',
  styleUrls: ['./mode-genie.component.css']
})
export class ModeGenieComponent implements OnInit {
  public tab: string;
  public inputTab: string;

  constructor() { }

  ngOnInit() {
  }

  readableTab(tab: string): string {
    if (tab === undefined) {
      return '';
    }

    const readableTabParts: Array<string> = [];
    for (const item of tab.toLowerCase().split(',')) {
      if (item === '-1') {
        readableTabParts.push('x');
      } else {
        readableTabParts.push(item);
      }
    }
    return readableTabParts.join(' ');
  }

  onChange(event: ChangeEvent) {
    this.tab = (event.tab);
    this.inputTab = this.readableTab(this.tab);
  }

  addChord() {
    console.log('Add chord', this.inputTab);
  }
}
