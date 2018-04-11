import {Component, Input} from '@angular/core';

@Component({
  selector: 'un-place-menu',
  templateUrl: './place-menu.component.html',
  styleUrls: ['./place-menu.component.scss']
})
export class PlaceMenuComponent {
  @Input() menu: StringMap<number>;
}
