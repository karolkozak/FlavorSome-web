import {User} from '@app/security/models/user';
import {Place} from '@app/places/models/place';

export class Rate {
  id: number;
  author: User;
  place: Place;
  ratingDate: string;
  rating: number;
  comments: string;

  constructor(rating: number, comments: string) {
    this.rating = rating;
    this.comments = comments;
  }
}
