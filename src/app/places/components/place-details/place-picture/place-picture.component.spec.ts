import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePictureComponent } from './place-picture.component';

describe('PlacePictureComponent', () => {
  let component: PlacePictureComponent;
  let fixture: ComponentFixture<PlacePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
