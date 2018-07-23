import {RateSortingKey, SortDirection} from '@app/places/models/rates-sorting';

export class Pageable<T> {
  content: T[] = [];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: SortDirection;
  totalElements: number;
  totalPages: number;
}

export class PageableParams {
  page: number;
  size: number;
  sortKey: RateSortingKey;
  direction: SortDirection;

  constructor(values: { page?: number, size?: number, sort?: RateSortingKey, direction?: SortDirection } = {}) {
    this.page = values.page ? values.page : 0;
    this.size = values.size ? values.size : 4;
    this.sortKey = values.sort ? values.sort : RateSortingKey.FRIENDS;
    this.direction = values.direction ? values.direction : SortDirection.ASC;
  }
}
