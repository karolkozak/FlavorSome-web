import {Component, OnInit} from '@angular/core';
import {CustomTranslateService} from '../../../shared/services/custom-translate.service';

@Component({
  selector: 'un-language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.scss']
})
export class LanguageChooserComponent implements OnInit {
  availableCultureLanguages: Array<string>;

  constructor(private customTranslateService: CustomTranslateService) {
  }

  ngOnInit() {
    this.availableCultureLanguages = this.customTranslateService.getAvailableCultureLanguages();
  }

  get currentLanguage(): string {
    return this.availableCultureLanguages.find(v => v.startsWith(this.customTranslateService.getCurrentLanguage()));
  }

  changeLanguage(language: string) {
    console.warn(language);
    language = language.split('-')[0];
    this.customTranslateService.changeLanguage(language);
  }
}
