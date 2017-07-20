import { concat } from 'rxjs/observable/concat';
import { RootData } from '@angular/core/src/view/types';
import { Injectable } from '@angular/core';

import { ChordDefinitions, ChordDefinition } from './models/chord-definitions';


@Injectable()
export class ChordService {
  constructor() {
  }

  Roots(): Array<string> {
    return Object.keys(ChordDefinitions.definitionsByRoot);
  }

  Types(root: string) {
    const definition: ChordDefinition = ChordDefinitions.definitionsByRoot[root];

    if (!definition) {
      return [];
    }

    const result: Array<string> = [];
    for (const type of definition.types) {
      result.push(type.name);
    }
    return result;
  }

  VariationsCount(root: string, type: string): number {
    const definition: ChordDefinition = ChordDefinitions.definitionsByRoot[root];
    if (definition) {
      for (const defType of definition.types) {
        if (defType.name === type) {
          return defType.variations.length;
        }
      }
    }
    return 0;
  }

  Variations(root: string, type: string, nb: number): Array<number> {
    const definition: ChordDefinition = ChordDefinitions.definitionsByRoot[root];
    if (definition) {
      for (const defType of definition.types) {
        if (defType.name === type) {
          return defType.variations[nb];
        }
      }
    }
    return [];
  }
}
