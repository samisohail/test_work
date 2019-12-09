import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    let transformedVal: any;

    console.log(value);
    for (let key in value) {
      if (value[key] === '1') {
        transformedVal = 'Yes';
      } else {
        transformedVal = 'No';
      }
      console.log(key);
      
      keys.push({ key: key , value: transformedVal });
    }

    console.log(keys);
    
    return keys;
  }
}
