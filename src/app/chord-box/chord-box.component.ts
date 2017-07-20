import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Svg, SvgCircle, SvgPath, SvgText } from '../svg/svg';

@Component({
  selector: 'app-chord-box',
  templateUrl: './chord-box.component.html',
  styleUrls: ['./chord-box.component.css']
})
export class ChordBoxComponent implements OnInit, OnChanges {
  @Input() label: string;

  @Input() tab: string;

  svg: Svg;

  constructor() {}

  ngOnInit() {
    this.setupSvg();
  }

  ngOnChanges() {
    this.setupSvg();
  }

  setupSvg() {
    if (this.tab) {
      this.svg = this.buildChordSvg(this.label,
          this.tabToTabValue(this.tab));
    } else {
      this.svg = new Svg();
    }
  }

  tabToTabValue(tab: string): Array<number> {
    const tabValue: Array<number> = [];
    for (const val of tab.split(',')) {
      tabValue.push(Number(val));
    }
    return tabValue;
  }

  buildChordSvg(label: string, data: Array<number>): Svg {
    const svg = new Svg();

    let min = 99;
    let max = 0;

    let fret = 0;

    for (let i = 0; i < 6; i++) {
      min = (data[i] < min && data[i] > 0) ? data[i] : min;
      max = (data[i] > max && data[i] > 0) ? data[i] : max;
    }

    if (max > 5) {
      fret = min;
    }

    const offset = (fret > 0) ? fret - 1 : 0;
    for (let i = 0; i < 6; i++) {
      if (data[i] === -1) { // Muted strings.
        svg.addPath(new SvgPath('M' + (16 + (10 * i)) + ' 7L' + (24 + (10 * i))
          + ' 15M' + (16 + (10 * i)) + ' 15L' + (24 + (10 * i)) + ' 7'));
      } else if (data[i] === 0) { // Open strings
        svg.addCircle(new SvgCircle(20 + (10 * i), 11, 3.5));
      } else { // All other strings.
        svg.addCircle(new SvgCircle(20 + (10 * i), 15 + (10 * (data[i] - offset)), 3.5, '#000'));
      }
    }

    if (fret > 0) {
      svg.addText(new SvgText(84, 24, fret + 'fr'));
    } else {
      svg.addPath(new SvgPath('M20 18L70 18L70 20L20 20L20 18', '#000'));
    }

    if (label) {
      svg.addText(new SvgText(45, 78, label));
    }

    for (let i = 0; i < 6; i++) {
      const position = 20 + (10 * i);
      svg.addPath(new SvgPath('M20 ' + position + 'L70 ' + position));
      svg.addPath(new SvgPath('M' + position + ' 20L' + position + ' 70'));
    }

    return svg;
  }
}
