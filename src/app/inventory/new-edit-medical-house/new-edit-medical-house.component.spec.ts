import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditMedicalHouseComponent } from './new-edit-medical-house.component';

describe('NewEditMedicalHouseComponent', () => {
  let component: NewEditMedicalHouseComponent;
  let fixture: ComponentFixture<NewEditMedicalHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditMedicalHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditMedicalHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
