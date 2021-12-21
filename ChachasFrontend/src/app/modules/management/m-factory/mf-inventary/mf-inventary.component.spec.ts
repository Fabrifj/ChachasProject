import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfInventaryComponent } from './mf-inventary.component';

describe('MfInventaryComponent', () => {
  let component: MfInventaryComponent;
  let fixture: ComponentFixture<MfInventaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfInventaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
