import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AuthenticationService} from '../../../security/services/authentication.service';
import {FacebookAuthService} from '../../../security/services/facebook-auth.service';
import {SecurityModule} from '../../../security/security.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LanguageChooserComponent} from '../language-chooser/language-chooser.component';
import {MatToolbarModule} from '@angular/material';
import {FlagLangPipe} from '../../../shared/pipes/flag-lang.pipe';
import {FlagCultureLangPipe} from '../../../shared/pipes/flag-culture-lang.pipe';
import {SharedModule} from '../../../shared/shared.module';
import {NotificationsService} from 'angular2-notifications';
import {TranslateModule} from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SecurityModule, RouterTestingModule, SharedModule],
      declarations: [HeaderComponent, LanguageChooserComponent],
      providers: [AuthenticationService, FacebookAuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
