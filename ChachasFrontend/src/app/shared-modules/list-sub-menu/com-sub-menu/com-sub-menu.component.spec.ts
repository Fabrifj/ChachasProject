import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComSubMenuComponent } from './com-sub-menu.component';

describe('ComSubMenuComponent', () => {
  let component: ComSubMenuComponent;
  let fixture: ComponentFixture<ComSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
