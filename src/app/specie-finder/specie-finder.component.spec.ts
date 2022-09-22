import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieFinderComponent } from './specie-finder.component';

describe('SpecieFinderComponent', () => {
  let component: SpecieFinderComponent;
  let fixture: ComponentFixture<SpecieFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
