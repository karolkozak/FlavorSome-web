export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class RatesSorting {
  sortName: string;
  sortKey: RateSortingKey;
  sortDirection: SortDirection;

  constructor(sortName: string, sortKey: RateSortingKey, sortDirection: SortDirection) {
    this.sortName = sortName;
    this.sortKey = sortKey;
    this.sortDirection = sortDirection;
  }
}

export enum RateSortingKey {
  FRIENDS = 'friends',
  RATING_DATE = 'ratingDate',
  RATINGS = 'rating'
}

export const ratesSortingOptions: RatesSorting[] = [
  new RatesSorting('Friends ratings ascending', RateSortingKey.FRIENDS, SortDirection.ASC),
  new RatesSorting('Friends ratings descending', RateSortingKey.FRIENDS, SortDirection.DESC),
  new RatesSorting('Date ascending', RateSortingKey.RATING_DATE, SortDirection.ASC),
  new RatesSorting('Date descending', RateSortingKey.RATING_DATE, SortDirection.DESC),
  new RatesSorting('Ratigns ascending', RateSortingKey.RATINGS, SortDirection.ASC),
  new RatesSorting('Ratings descendings', RateSortingKey.RATINGS, SortDirection.DESC),
];
