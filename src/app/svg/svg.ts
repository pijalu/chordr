export class SvgCircle {
    cookie: any;
    fill = '#000000';
    stroke = '#000';
    fillOpacity = '1.0';

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
    cookie: any;
    fill = 'none';
    stroke = '#000000';

    constructor(public d: string, fill?: string) {
        if (fill) {
            this.fill = fill;
        }
    }
}

export class SvgText {
    cookie: any;
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
