import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfSubsidiaryComponent } from './mf-subsidiary.component';

describe('MfSubsidiaryComponent', () => {
  let component: MfSubsidiaryComponent;
  let fixture: ComponentFixture<MfSubsidiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfSubsidiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
