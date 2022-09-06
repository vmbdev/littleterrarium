import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddEditComponent } from './location-add-edit.component';

describe('LocationAddEditComponent', () => {
  let component: LocationAddEditComponent;
  let fixture: ComponentFixture<LocationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
