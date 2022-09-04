import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditSizeComponent } from './new-edit-size.component';

describe('NewEditSizeComponent', () => {
  let component: NewEditSizeComponent;
  let fixture: ComponentFixture<NewEditSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
