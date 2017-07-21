import { Pipe, PipeTransform } from '@angular/core';

import { Notes } from '../engine/note';
import { Fretboard } from '../engine/fretboard';

@Pipe({
  name: 'tabToNotes'
})
export class TabToNotesPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return Notes.Note.Names(
      Fretboard.Fretboard.From('E').asNotes(value));
  }
}
