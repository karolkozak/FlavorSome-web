import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSearcherComponent } from './place-searcher.component';

describe('PlaceSearcherComponent', () => {
  let component: PlaceSearcherComponent;
  let fixture: ComponentFixture<PlaceSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
