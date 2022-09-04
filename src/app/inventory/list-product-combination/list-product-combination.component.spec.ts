import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductCombinationComponent } from './list-product-combination.component';

describe('ListProductCombinationComponent', () => {
  let component: ListProductCombinationComponent;
  let fixture: ComponentFixture<ListProductCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
