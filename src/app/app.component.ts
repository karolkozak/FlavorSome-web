import { Component } from '@angular/core';

@Component({
  selector: 'un-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'un';

  onActivate() {
    window.scrollTo(0, 0);
  }
}
