import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantEditSoilComponent } from './plant-edit-soil.component';

describe('PlantEditSoilComponent', () => {
  let component: PlantEditSoilComponent;
  let fixture: ComponentFixture<PlantEditSoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantEditSoilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantEditSoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
