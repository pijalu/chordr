export class RaphaelChordType {
    numberVariation: number;
}

export class RaphaelChordRoot {
    types: Map<string, RaphaelChordType> = new Map();
}

/** Class that represent some subset of data known by Raphael Chords */
export class RaphaelChords {
    roots: Map<string, RaphaelChordRoot> = new Map();
}
