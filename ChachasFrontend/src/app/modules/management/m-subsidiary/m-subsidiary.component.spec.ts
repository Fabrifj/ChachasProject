import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSubsidiaryComponent } from './m-subsidiary.component';

describe('MSubsidiaryComponent', () => {
  let component: MSubsidiaryComponent;
  let fixture: ComponentFixture<MSubsidiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MSubsidiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
