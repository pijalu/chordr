import { Component, OnInit, Output } from '@angular/core';
import { Svg, SvgCircle, SvgPath, SvgText } from '../svg/svg';

class CircleCookie {
  clicked = false;
  mutted = false;

  constructor(
    public id: number,
    public fret: number,
    public string: number) { }
}

@Component({
  selector: 'app-chord-input',
  templateUrl: './chord-input.component.html',
  styleUrls: ['./chord-input.component.css']
})
export class ChordInputComponent implements OnInit {
  /* Map of all SVG circles */
  circleMap: Map<CircleCookie, SvgCircle>;
  /* for each string, the current selected circle if any */
  selectedStringCircle: Array<SvgCircle> = [undefined, undefined, undefined, undefined, undefined, undefined];

  svg: Svg;

  @Output()
  tab: string;

  constructor() {
    this.buildSvg();
  }

  ngOnInit() { }

  buildSvg() {
    const svg: Svg = new Svg();
    const circleMap = new Map();
    let circleId = 0;

    svg.addPath(new SvgPath('M20 32L220 32L220 40L20 40L20 32', '#000'));

    for (let i = 0; i < 6; i++) {
      const position = 20 + (40 * i);
      // String
      svg.addPath(new SvgPath('M' + position + ' 40L' + position + ' 520'));
    }
    for (let i = 0; i <= 12; i++) {
      const position = 40 + (40 * i);
      // Fret
      svg.addPath(new SvgPath('M20 ' + position + 'L220 ' + position));

      if (i && (i === 11 || i < 9 && (i % 2) === 0)) {
        const textPosition = 40 + (40 * (i + 1));
        svg.addText(new SvgText(255, textPosition - 15, (i + 1) + 'fr'));
      }
    }

    for (let y = 0; y <= 12; y++) {
      for (let x = 0; x < 6; x++) {
        const positionX = 20 + (40 * x);
        const positionY = 20 + (40 * y);
        const circle = new SvgCircle(positionX, positionY, 12, '#ffffff');
        circle.cookie = new CircleCookie(circleId, y, x);

        circleMap[circleId] = circle;
        circleId++;
        svg.addCircle(circle);
      }
    }
    this.circleMap = circleMap;
    this.svg = svg;
    this.updateTab();
  }

  selectCircle(cookie: CircleCookie) {
    console.log('Clicked', cookie);

    if (cookie.id < 6) {
      if (cookie.clicked) {
        cookie.mutted = true;
        cookie.clicked = false;
      } else if (cookie.mutted) {
        cookie.mutted = false;
      } else {
        cookie.clicked = true;
      }
    } else {
      cookie.clicked = !cookie.clicked;
    }

    // unselect previous selection if it's another circle
    if (this.selectedStringCircle[cookie.string] !== undefined
      && this.selectedStringCircle[cookie.string].cookie.id !== cookie.id) {
      const previousSelection = this.selectedStringCircle[cookie.string];
      previousSelection.fill = '#ffffff';
      previousSelection.cookie.clicked = false;
      previousSelection.cookie.mutted = false;
    }

    // change/unselect previous (if any)
    if (cookie.clicked || cookie.mutted) {
      // Update selection
      this.selectedStringCircle[cookie.string] = this.circleMap[cookie.id];
    } else {
      // Reset
      this.selectedStringCircle[cookie.string] = undefined;
    }
    this.updateTab();

    if (cookie.mutted) {
      this.circleMap[cookie.id].fill = '#ff0000';
    } else if (cookie.clicked) {
      this.circleMap[cookie.id].fill = '#000000';
    } else {
      this.circleMap[cookie.id].fill = '#ffffff';
    }
  }

  updateTab() {
    const tabs: Array<number> = [];
    for (let i = 0; i < 6; ++i) {
      const selectedCircle = this.selectedStringCircle[i];
      if (selectedCircle === undefined
        || selectedCircle.cookie.mutted) {
        tabs.push(-1);
      } else if (selectedCircle.cookie.clicked) {
        tabs.push(selectedCircle.cookie.fret);
      }
    }
    this.tab = tabs.join(',');
    console.log('tab', this.tab);
  }
}
