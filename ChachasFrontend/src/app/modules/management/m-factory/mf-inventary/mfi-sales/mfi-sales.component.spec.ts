import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiSalesComponent } from './mfi-sales.component';

describe('MfiSalesComponent', () => {
  let component: MfiSalesComponent;
  let fixture: ComponentFixture<MfiSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfiSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
