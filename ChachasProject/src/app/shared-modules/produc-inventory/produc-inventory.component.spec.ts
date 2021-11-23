import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducInventoryComponent } from './produc-inventory.component';

describe('ProducInventoryComponent', () => {
  let component: ProducInventoryComponent;
  let fixture: ComponentFixture<ProducInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
