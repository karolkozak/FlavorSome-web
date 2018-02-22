import {Component, OnInit} from '@angular/core';
import {ConfigService} from './shared/services/config.service';

@Component({
  selector: 'un-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'un';

  constructor(private configService: ConfigService) {}

  onActivate() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.configService.getAvailablePlaceTypes().subscribe();
  }
}
