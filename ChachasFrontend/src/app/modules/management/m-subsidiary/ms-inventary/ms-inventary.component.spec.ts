import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsInventaryComponent } from './ms-inventary.component';

describe('MsInventaryComponent', () => {
  let component: MsInventaryComponent;
  let fixture: ComponentFixture<MsInventaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsInventaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
