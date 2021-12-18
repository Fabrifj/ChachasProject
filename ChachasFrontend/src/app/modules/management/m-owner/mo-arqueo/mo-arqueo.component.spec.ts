import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoArqueoComponent } from './mo-arqueo.component';

describe('MoArqueoComponent', () => {
  let component: MoArqueoComponent;
  let fixture: ComponentFixture<MoArqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoArqueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoArqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
