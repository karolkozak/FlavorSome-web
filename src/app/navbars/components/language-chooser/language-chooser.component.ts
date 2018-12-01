import {Component, OnInit} from '@angular/core';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.scss']
})
export class LanguageChooserComponent implements OnInit {
  availableCultureLanguages: Array<string>;

  constructor(private customTranslateService: CustomTranslateService, private customTitleService: CustomTitleService) {
  }

  ngOnInit() {
    this.availableCultureLanguages = this.customTranslateService.getAvailableCultureLanguages();
  }

  get currentLanguage(): string {
    return this.availableCultureLanguages.find(v => v.startsWith(this.customTranslateService.getCurrentLanguage()));
  }

  changeLanguage(language: string) {
    [language] = language.split('-');
    this.customTranslateService.changeLanguage(language);
    const title = this.customTitleService.getTitle();
    this.customTitleService.setTitle(title);
  }
}
