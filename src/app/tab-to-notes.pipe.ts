import { Pipe, PipeTransform } from '@angular/core';

import { Notes } from '../engine/note';
import { Fretboards } from '../engine/fretboard';

@Pipe({
  name: 'tabToNotes'
})
export class TabToNotesPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return Notes.Note.Names(
      Fretboards.Fretboard.From('E').asNotes(value));
  }
}
