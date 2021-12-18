import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoSucursalesComponent } from './mo-sucursales.component';

describe('MoSucursalesComponent', () => {
  let component: MoSucursalesComponent;
  let fixture: ComponentFixture<MoSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoSucursalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
