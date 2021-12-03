import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOwnerComponent } from './m-owner.component';

describe('MOwnerComponent', () => {
  let component: MOwnerComponent;
  let fixture: ComponentFixture<MOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
