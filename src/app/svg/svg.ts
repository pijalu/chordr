export class SvgCircle {
    fill = '#000000';
    stroke = '#000';
    style = '';

    constructor(public cx: number,
        public cy: number,
        public r: number,
        fill?: string
    ) {
        if (fill) {
            this.fill = fill;
        }
    }
}

export class SvgPath {
    fill = 'none';
    stroke = '#000000';
    style = '';

    constructor(public d: string, fill?: string) {
        if (fill) {
            this.fill = fill;
        }
    }
}

export class SvgText {
    style = '{text-anchor: middle; font: 10px "Arial";}';
    text_anchor = 'middle';
    font = '10px "Arial"';
    fill = '#000000';
    stroke = 'none';

    constructor(public x: number,
        public y: number,
        public text: string) {}
}

export class Svg {
    texts: Array<SvgText> = [];
    paths: Array<SvgPath> = [];
    circles: Array<SvgCircle> = [];

    addText(text: SvgText) {
        this.texts.push(text);
    }

    addPath(path: SvgPath) {
        this.paths.push(path);
    }

    addCircle(circle: SvgCircle) {
        this.circles.push(circle);
    }
}
