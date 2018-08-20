import {SortDirection} from '@app/places/models/rates-sorting';

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
