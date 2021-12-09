import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderInfoComponent } from './display-order-info.component';

describe('DisplayOrderInfoComponent', () => {
  let component: DisplayOrderInfoComponent;
  let fixture: ComponentFixture<DisplayOrderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
