import {User} from '@app/security/models/user';

export class Rate {
  id: number;
  author: User;
  ratingDate: string;
  rating: number;
  comments: string;

  constructor(rating: number, comments: string) {
    this.rating = rating;
    this.comments = comments;
  }
}
