import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';
import {AuthenticationService} from '../../../security/services/authentication.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LoginPageComponent],
      providers: [AuthenticationService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
