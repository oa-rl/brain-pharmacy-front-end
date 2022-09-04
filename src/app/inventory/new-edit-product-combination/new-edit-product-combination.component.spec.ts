import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProductCombinationComponent } from './new-edit-product-combination.component';

describe('NewEditProductCombinationComponent', () => {
  let component: NewEditProductCombinationComponent;
  let fixture: ComponentFixture<NewEditProductCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditProductCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditProductCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
