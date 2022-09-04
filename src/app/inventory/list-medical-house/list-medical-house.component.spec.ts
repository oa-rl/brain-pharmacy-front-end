import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalHouseComponent } from './list-medical-house.component';

describe('ListMedicalHouseComponent', () => {
  let component: ListMedicalHouseComponent;
  let fixture: ComponentFixture<ListMedicalHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicalHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicalHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
