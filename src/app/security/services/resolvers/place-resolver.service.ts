import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {CustomTitleService} from '@app/core/services/custom-title.service';
import {PlacesService} from '@app/places/services/places.service';
import {Place} from '@app/places/models/place';

@Injectable()
export class PlaceResolverService implements Resolve<Place> {
  constructor(private placesService: PlacesService, private router: Router, private customTitleService: CustomTitleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Place> | Promise<Place> | Place {
    const vendorPlaceId = route.paramMap.get('id');
    return this.placesService.getPlace(vendorPlaceId).pipe(
      tap(place => {
          this.customTitleService.setTitle(place.name);
        }
      )
    ).catch(error => {
      this.router.navigate(['/not-found']);
      return Observable.throw(error);
    });
  }
}
