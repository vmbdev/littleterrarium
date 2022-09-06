import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAddEditComponent } from './photo-add-edit.component';

describe('PhotoAddEditComponent', () => {
  let component: PhotoAddEditComponent;
  let fixture: ComponentFixture<PhotoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
