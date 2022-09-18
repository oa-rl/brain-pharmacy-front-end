import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductMovementComponent } from './list-product-movement.component';

describe('ListProductMovementComponent', () => {
  let component: ListProductMovementComponent;
  let fixture: ComponentFixture<ListProductMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
