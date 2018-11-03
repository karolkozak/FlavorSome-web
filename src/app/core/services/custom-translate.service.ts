import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '@env/environment';
import {inArray} from '@app/shared/utils/array-utils';
import * as moment from 'moment';

@Injectable()
export class CustomTranslateService {

  constructor(private translateService: TranslateService) {
  }

  public setTranslations() {
    this.translateService.addLangs(environment.availableLanguages);
    this.translateService.setDefaultLang(environment.defaultLanguage);
    this.setDefaultUserLanguage();
  }

  public getAvailableLanguages(): Array<string> {
    return this.translateService.getLangs();
  }

  /**
   * browser language is always set to country language e.g. 'en', culture language is e.g. 'en-GB'
   * for displaying flags we have to retrieve suffix of culture language, so if we support 'en' with i18n
   * we should also set flag for this language and keep separate array of culture languages in environments
   */
  public getAvailableCultureLanguages(): Array<string> {
    return environment.availableCultureLanguages;
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  public setDefaultUserLanguage() {
    const userLanguage = this.translateService.getBrowserLang();
    if (inArray(userLanguage, this.getAvailableLanguages())) {
      this.changeLanguage(userLanguage);
    } else {
      this.changeLanguage(environment.defaultLanguage);
    }
  }

  public changeLanguage(lang: string) {
    this.translateService.use(lang);
    moment.locale(lang);
  }

  public getTranslation(name: string, params?: Object): Observable<any> {
    return this.translateService.get(name, params);
  }
}
