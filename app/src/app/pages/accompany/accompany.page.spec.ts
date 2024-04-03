import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccompanyPage } from './accompany.page';

describe('AccompanyPage', () => {
  let component: AccompanyPage;
  let fixture: ComponentFixture<AccompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
