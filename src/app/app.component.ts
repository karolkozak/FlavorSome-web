import {Component, OnInit} from '@angular/core';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'un';

  constructor(private customTranslateService: CustomTranslateService) {
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.customTranslateService.setTranslations();
  }
}
