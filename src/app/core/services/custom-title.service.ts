import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

export enum CONST_TITLES {
  UNNAMED_SUFFIX = ' | Unnamed',
  WELCOME = 'Welcome!',
  LOGIN = 'Login page',
  REGISTRATION = 'Registration page',
  CONFIRMATION = 'Confirmation page',
  DASHBOARD = 'Dashboard',
  PLACES = 'Places',
  NOT_FOUND = 'Page not found'
}

@Injectable()
export class CustomTitleService {

  constructor(private title: Title, private customTranslateService: CustomTranslateService) {
  }

  public getTitle(): string {
    return this.title.getTitle().split('|')[0].trim();
  }

  public setTitle(title: string) {
    this.customTranslateService.getTranslation(title).subscribe(result => {
      this.title.setTitle(`${result}${CONST_TITLES.UNNAMED_SUFFIX}`);
    });
  }
}
