import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tab'
})
export class TabPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value === undefined) {
      return undefined;
    }
    const tabPart: Array<string> = [];
    for (const part of value.toLowerCase().split(/\ |,/)) {
      if (part === '-1') {
        tabPart.push('x');
      } else {
        tabPart.push(part);
      }
    }
    return tabPart.join(' ');
  }

}
