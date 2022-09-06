import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAddEditComponent } from './plant-add-edit.component';

describe('PlantAddEditComponent', () => {
  let component: PlantAddEditComponent;
  let fixture: ComponentFixture<PlantAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
