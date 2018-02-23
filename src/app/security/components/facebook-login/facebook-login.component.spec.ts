import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacebookLoginComponent} from './facebook-login.component';
import {AuthService, SocialLoginModule} from '../../libs/angular5-social-login';

describe('FacebookLoginComponent', () => {
  let component: FacebookLoginComponent;
  let fixture: ComponentFixture<FacebookLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginModule, AuthService],
      declarations: [FacebookLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
