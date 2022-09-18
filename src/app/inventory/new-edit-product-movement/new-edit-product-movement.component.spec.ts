import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProductMovementComponent } from './new-edit-product-movement.component';

describe('NewEditProductMovementComponent', () => {
  let component: NewEditProductMovementComponent;
  let fixture: ComponentFixture<NewEditProductMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditProductMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditProductMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
