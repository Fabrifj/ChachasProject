import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubMenuComponent } from './list-sub-menu.component';

describe('ListSubMenuComponent', () => {
  let component: ListSubMenuComponent;
  let fixture: ComponentFixture<ListSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
