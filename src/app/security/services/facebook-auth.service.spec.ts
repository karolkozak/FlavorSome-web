import {TestBed} from '@angular/core/testing';

import {FacebookAuthService} from './facebook-auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule} from 'ngx-toastr';
import {AuthService, AuthServiceConfig} from 'angular5-social-login';

describe('FacebookAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule, AuthServiceConfig],
      providers: [FacebookAuthService, AuthService]
    });
  });

  // it('should be created', inject([FacebookAuthService], (service: FacebookAuthService) => {
  //   expect(service).toBeTruthy();
  // }));
});
