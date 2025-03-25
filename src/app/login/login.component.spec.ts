import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should invalidate the form when fields are empty', () => {
    component.onSubmit();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should submit form when valid', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.submitted).toBeTruthy();
    expect(window.alert).toHaveBeenCalledWith('Great!! test@example.com');
  });

  it('should validate email field correctly', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.invalid).toBeTruthy();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });

  it('should validate password field correctly', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    expect(passwordControl.invalid).toBeTruthy();
    expect(passwordControl.errors?.['required']).toBeTruthy();
  });
});
