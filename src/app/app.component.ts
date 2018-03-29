import {Component, OnInit} from '@angular/core';
import {ConfigService} from '@app/core/services/config.service';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'un-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'un';

  constructor(private configService: ConfigService, private customTranslateService: CustomTranslateService) {
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.fetchConfig();
    this.customTranslateService.setTranslations();
  }

  private fetchConfig() {
    this.configService.getAvailablePlaceTypes().subscribe();
  }
}
