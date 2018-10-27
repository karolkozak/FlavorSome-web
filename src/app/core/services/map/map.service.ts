import { Injectable } from '@angular/core';

@Injectable()
export abstract class MapService {
  /**
   * Retrieves an API provider.
   * @returns {string} API provider class name
   * @see MapServiceAPI
   */
  abstract get provider(): string

  /**
   * Returns an object with provider-specific properties and methods.
   * @returns {object}
   */
  abstract get config(): any;

  abstract setMap(map: any): void;

  abstract setCenter(pos: any): void;

  abstract addMarker(pos: any): any;
  abstract removeMarker(marker: any): void;

  abstract drawCircle(center: any, radius: number): any;
  abstract redrawCircle(circle: any, radius: number): any;
  abstract removeCircle(circle: any): void;
}
