import {RateSortingKey, SortDirection} from '@app/places/models/rates-sorting';

export class PageableParams {
  page: number;
  size: number;
  sortKey: RateSortingKey;
  direction: SortDirection;

  constructor(values: { page?: number, size?: number, sort?: RateSortingKey, direction?: SortDirection, isLogged?: boolean } = {}) {
    this.page = values.page ? values.page : 0;
    this.size = values.size ? values.size : 4;
    // TODO: replace it after Flavorsome #114
    // this.sortKey = values.sort ? values.sort : (values.isLogged ? RateSortingKey.FRIENDS : RateSortingKey.RATING_DATE);
    this.sortKey = values.sort ? values.sort : RateSortingKey.RATING_DATE;
    this.direction = values.direction ? values.direction : SortDirection.ASC;
  }
}
