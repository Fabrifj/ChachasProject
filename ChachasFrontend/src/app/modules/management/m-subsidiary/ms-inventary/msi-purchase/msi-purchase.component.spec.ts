import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsiPurchaseComponent } from './msi-purchase.component';

describe('MsiPurchaseComponent', () => {
  let component: MsiPurchaseComponent;
  let fixture: ComponentFixture<MsiPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsiPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsiPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
