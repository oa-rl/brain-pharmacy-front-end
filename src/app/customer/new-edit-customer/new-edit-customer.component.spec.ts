import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditCustomerComponent } from './new-edit-customer.component';

describe('NewEditCustomerComponent', () => {
  let component: NewEditCustomerComponent;
  let fixture: ComponentFixture<NewEditCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
