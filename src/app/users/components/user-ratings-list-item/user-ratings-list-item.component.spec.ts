import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatingsListItemComponent } from './user-ratings-list-item.component';

describe('UserRatingsListItemComponent', () => {
  let component: UserRatingsListItemComponent;
  let fixture: ComponentFixture<UserRatingsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRatingsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRatingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
