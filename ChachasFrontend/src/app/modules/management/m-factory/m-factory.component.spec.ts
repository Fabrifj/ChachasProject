import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFactoryComponent } from './m-factory.component';

describe('MFactoryComponent', () => {
  let component: MFactoryComponent;
  let fixture: ComponentFixture<MFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
