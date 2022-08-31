import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureboxComponent } from './picturebox.component';

describe('PictureboxComponent', () => {
  let component: PictureboxComponent;
  let fixture: ComponentFixture<PictureboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
