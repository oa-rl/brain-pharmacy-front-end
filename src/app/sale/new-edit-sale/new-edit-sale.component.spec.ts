import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditSaleComponent } from './new-edit-sale.component';

describe('NewEditSaleComponent', () => {
  let component: NewEditSaleComponent;
  let fixture: ComponentFixture<NewEditSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
