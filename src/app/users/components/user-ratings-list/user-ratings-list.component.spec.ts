import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatingsListComponent } from './user-ratings-list.component';

describe('UserRatingsListComponent', () => {
  let component: UserRatingsListComponent;
  let fixture: ComponentFixture<UserRatingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRatingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRatingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
