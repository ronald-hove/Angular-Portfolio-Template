import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  // tslint:disable-next-line: variable-name
  constructor(private _domSanitizer?: DomSanitizer) {}

  transform(value: string): any {
    if (value) {
      const temp = value.split(' ');
      const indexOfOccurrence: any[] = [];
      const links = temp.filter((subStr, index) => {
        const condition = subStr.trim().startsWith('http') || subStr.trim().startsWith('https');
        if (condition) {
          indexOfOccurrence.push(index);
        }
        return condition;
      });
      links.forEach((link, indx) => {
        temp[indexOfOccurrence[indx]] = `<a href="${link}" target="_blank">${link}</a>`;
      });
      return this._domSanitizer.bypassSecurityTrustHtml(temp.join(' '));
    }
  }

}
