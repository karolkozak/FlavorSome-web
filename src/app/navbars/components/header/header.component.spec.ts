import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AuthenticationService} from '../../../security/services/authentication.service';
import {FacebookAuthService} from '../../../security/services/facebook-auth.service';
import {SecurityModule} from '../../../security/security.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SecurityModule, RouterTestingModule],
      declarations: [ HeaderComponent ],
      providers: [AuthenticationService, FacebookAuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
