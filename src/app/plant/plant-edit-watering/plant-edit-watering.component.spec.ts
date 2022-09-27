import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantEditWateringComponent } from './plant-edit-watering.component';

describe('PlantEditWateringComponent', () => {
  let component: PlantEditWateringComponent;
  let fixture: ComponentFixture<PlantEditWateringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantEditWateringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantEditWateringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
