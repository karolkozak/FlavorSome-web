import {Component, Input, HostListener} from '@angular/core';
import {Place} from '@app/places/models/place';
import * as $ from 'jquery';

@Component({
  selector: 'fs-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent {
  @Input() places: Place[] = [];
  private columnNumbers = 3;
  private gridByBreakpoint = {
    lg: 3,
    md: 2,
    xs: 1
  };
  private columnHeight: string;
  private glutter: string;

  constructor() {
    this.setGridOptions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setGridOptions();
  }

  public setGridOptions() {
    if ($(window).width() < 768) {
      this.columnNumbers = this.gridByBreakpoint.xs;
      this.columnHeight = '180px';
      this.glutter = '20px';
    } else if ($(window).width() >= 768 && $(window).width() <= 992) {
      this.columnNumbers = this.gridByBreakpoint.md;
      this.columnHeight = '180px';
      this.glutter = '20px';
    } else if ($(window).width() > 992) {
      this.columnNumbers = this.gridByBreakpoint.lg;
      this.columnHeight = '180px';
      this.glutter = '20px';
    }
  }
}
