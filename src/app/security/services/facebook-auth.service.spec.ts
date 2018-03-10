import { TestBed, inject } from '@angular/core/testing';

import { FacebookAuthService } from './facebook-auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {AuthService, AuthServiceConfig} from '../libs/angular5-social-login';

describe('FacebookAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SimpleNotificationsModule, AuthServiceConfig],
      providers: [FacebookAuthService, NotificationsService, AuthService]
    });
  });

  it('should be created', inject([FacebookAuthService], (service: FacebookAuthService) => {
    expect(service).toBeTruthy();
  }));
});
