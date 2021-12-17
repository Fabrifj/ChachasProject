import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoEmpleadosComponent } from './mo-empleados.component';

describe('MoEmpleadosComponent', () => {
  let component: MoEmpleadosComponent;
  let fixture: ComponentFixture<MoEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
