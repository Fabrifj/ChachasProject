import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIngredientsComponent } from './show-ingredients.component';

describe('ShowIngredientsComponent', () => {
  let component: ShowIngredientsComponent;
  let fixture: ComponentFixture<ShowIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
