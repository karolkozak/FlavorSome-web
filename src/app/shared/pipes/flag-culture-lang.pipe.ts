import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'flagCultureLang'
})
export class FlagCultureLangPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const [, language] = value.split('-');
    return language.toLowerCase();
  }
}
