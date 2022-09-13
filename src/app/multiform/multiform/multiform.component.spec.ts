import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFormComponent } from './multiform.component';

describe('MultiFormComponent', () => {
  let component: MultiFormComponent;
  let fixture: ComponentFixture<MultiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
