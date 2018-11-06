import {PlaceLocation} from '@app/places/models/place-location';

export interface Place {
  placeId: string;
  vendorPlaceId: any;
  name: string;
  location: PlaceLocation;
  rating: string;
  description: string;
  defaultMenu: StringMap<any>;
  menu: StringMap<any>;
}
