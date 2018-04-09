import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailsPageComponent } from './place-details-page.component';

describe('PlaceDetailsPageComponent', () => {
  let component: PlaceDetailsPageComponent;
  let fixture: ComponentFixture<PlaceDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
