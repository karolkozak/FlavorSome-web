import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAddressComponent } from './place-address.component';

describe('PlaceAddressComponent', () => {
  let component: PlaceAddressComponent;
  let fixture: ComponentFixture<PlaceAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
