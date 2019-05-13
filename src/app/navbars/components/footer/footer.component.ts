import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'fs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: string;
  ngOnInit(): void {
    this.currentYear = moment().format('YYYY');
  }
}
