import {Survey} from './survey';
import {Place} from './place';

export interface User {
  facebookId: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  friends: User[];
  surveys: Survey[];
  ownedPlaces: Place[];
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS'
}
