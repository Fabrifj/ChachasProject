import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowElementComponent } from './show-element.component';

describe('ShowElementComponent', () => {
  let component: ShowElementComponent;
  let fixture: ComponentFixture<ShowElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
