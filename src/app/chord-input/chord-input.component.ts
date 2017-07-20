import { Component, OnInit } from '@angular/core';
import { Svg, SvgCircle, SvgPath, SvgText } from '../svg/svg';

@Component({
  selector: 'app-chord-input',
  templateUrl: './chord-input.component.html',
  styleUrls: ['./chord-input.component.css']
})
export class ChordInputComponent implements OnInit {
  svg: Svg;

  constructor() {
    this.buildSvg();
  }

  ngOnInit() {}

  buildSvg() {
    const svg: Svg = new Svg();
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

      if (i && (i==11 || i<9 && (i % 2) === 0)) {
        const textPosition = 40 + (40 * (i + 1));
        svg.addText(new SvgText(250, textPosition-10, (i + 1) + 'fr'));
      }
    }

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y <= 12; y++) {
        const positionX = 20 + (40 * x);
        const positionY = 20 + (40 * y);
        svg.addCircle(new SvgCircle(positionX, positionY, 12, '#ffffff'));
      }
    }

    this.svg = svg;
  }
}
