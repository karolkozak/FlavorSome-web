import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable()
export class ConfigService {

  private baseUrl: string;
  private placeTypes: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.flavorSomeMicroserviceUrl + environment.configPath;
  }

  getAvailablePlaceTypes(): string[] {
    return this.placeTypes;
  }

  load(): Promise<string[]> {
    const endpoint = this.baseUrl + environment.placeTypesPath;
    return new Promise((resolve, reject) => {
      this.httpClient.get<string[]>(endpoint).subscribe(placeTypes => {
        this.placeTypes = placeTypes;
        resolve(placeTypes);
      });
    });
  }
}
