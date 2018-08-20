import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageableParams} from '@app/places/models/pageable-params';

@Component({
  selector: 'un-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageableParams: PageableParams;
  @Input() first: boolean;
  @Input() last: boolean;
  @Output() dataChanged = new EventEmitter<PageableParams>();

  constructor() { }

  ngOnInit() {
  }

  moreResults(page: number) {
    this.pageableParams.page = page;
    this.dataChanged.emit(this.pageableParams);
  }
}
