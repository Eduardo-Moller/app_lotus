import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestRegisterPage } from './request-register.page';

describe('RequestRegisterPage', () => {
  let component: RequestRegisterPage;
  let fixture: ComponentFixture<RequestRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
