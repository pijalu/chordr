import { Pipe, PipeTransform } from '@angular/core';

import { Notes } from '../engine/notes';
import { Fretboards } from '../engine/fretboards';

@Pipe({
  name: 'tabToNotes'
})
export class TabToNotesPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return Notes.Note.Names(
      Fretboards.Fretboard.From('E').asNotes(value));
  }
}
