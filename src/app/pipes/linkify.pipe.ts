import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const temp = value.split(' ');
      console.log('LINKIFY', temp);
      const indx = temp.findIndex((subStr) => {
        return subStr.trim().startsWith('http') || subStr.trim().startsWith('https');
      });
      temp[indx] = `<a href="${temp[indx]}">${temp[indx]}</a>`;
      return temp.join(' ');
    }
  }

}
