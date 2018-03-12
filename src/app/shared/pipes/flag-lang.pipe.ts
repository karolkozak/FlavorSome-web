import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'flagLang'
})
export class FlagLangPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const [cultureLanguage] = value.split('-');
    return cultureLanguage.toLowerCase();
  }
}
