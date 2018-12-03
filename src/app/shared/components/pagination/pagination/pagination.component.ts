import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageableParams} from '@app/places/models/pageable-params';

@Component({
  selector: 'fs-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageableParams: PageableParams;
  @Input() first: boolean;
  @Input() last: boolean;
  @Output() dataChanged = new EventEmitter<PageableParams>();

  moreResults(page: number) {
    this.pageableParams.page = page;
    this.dataChanged.emit(this.pageableParams);
  }
}
