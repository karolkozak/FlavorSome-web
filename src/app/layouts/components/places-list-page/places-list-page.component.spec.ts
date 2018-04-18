import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListPageComponent } from './places-list-page.component';

describe('PlacesListPageComponent', () => {
  let component: PlacesListPageComponent;
  let fixture: ComponentFixture<PlacesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
