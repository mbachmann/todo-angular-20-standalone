import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { DebugElement, importProvidersFrom } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let submitButton: DebugElement;
  let firstNameInput: DebugElement;
  let lastNameInput: DebugElement;
  let emailInput: DebugElement;
  let passwordInput: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [importProvidersFrom(FormsModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    firstNameInput = fixture.debugElement.query(By.css('input[name="firstName"]'));
    lastNameInput = fixture.debugElement.query(By.css('input[name="lastName"]'));
    emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial empty model', () => {
    fixture.detectChanges();
    expect(component.model).toBeDefined();
  });

  it('should enable submit button when form is valid', () => {
    firstNameInput.nativeElement.value = 'John';
    lastNameInput.nativeElement.value = 'Doe';
    emailInput.nativeElement.value = 'john@example.com';
    passwordInput.nativeElement.value = 'password123';
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should reset form after submission', fakeAsync(() => {
    spyOn(component.form, 'reset');
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';
    fixture.detectChanges();
    tick(1);
    component.onSubmit(component.form);
    tick(1);
    fixture.detectChanges();

    expect(component.form.reset).toHaveBeenCalled();
  }));

  it('should display correct JSON output', fakeAsync(() => {
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';
    component.model.language = 'English';
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    tick(1);
    const jsonOutput = fixture.debugElement.query(By.css('pre small'));
    const displayedJson = JSON.parse(jsonOutput.nativeElement.textContent);

    expect(displayedJson).toEqual({
      name: { firstName: 'John', lastName: 'Doe' },
      email: 'john@example.com',
      password: 'password123',
      language: 'English',
    });
  }));

  it('should display error message when first name is empty', fakeAsync(() => {
    triggerValidation(firstNameInput, '');
    const errorMsg = fixture.debugElement.query(By.css('.form-group:first-child .form-control-feedback'));
    expect(errorMsg.nativeElement.textContent).toContain('First name is required');
  }));

  it('should display error message when last name is empty', fakeAsync(() => {
    triggerValidation(lastNameInput, '');
    const errorMsg = fixture.debugElement.query(By.css('.form-group:nth-child(2) .form-control-feedback'));
    expect(errorMsg.nativeElement.textContent).toContain('Last name is required');
  }));

  it('should display error message when email is invalid', fakeAsync(() => {
    triggerValidation(emailInput, 'invalidemail');
    const errorMsg = fixture.debugElement.query(By.css('#email-error-at-least'));
    expect(errorMsg.nativeElement.textContent).toContain('Email must contain at least the @ character');
  }));

  it('should display error message when email is empty', fakeAsync(() => {
    triggerValidation(emailInput, '');
    const errorMsg = fixture.debugElement.query(By.css('#email-error-required'));
    expect(errorMsg.nativeElement.textContent).toContain('Email is required');
  }));

  it('should display error message when password is to short', fakeAsync(() => {
    triggerValidation(passwordInput, 'werwe');
    const errorMsg = fixture.debugElement.query(By.css('#password-error-at-least'));
    expect(errorMsg.nativeElement.textContent).toContain('Password must be at least 8 characters long');
  }));

  it('should display error message when password is empty', fakeAsync(() => {
    triggerValidation(passwordInput, '');
    const errorMsg = fixture.debugElement.query(By.css('#password-error-required'));
    expect(errorMsg.nativeElement.textContent).toContain('Password is required');
  }));

  function triggerValidation(input: DebugElement, value: string) {
    input.nativeElement.dispatchEvent(new Event('focus'));
    tick(1);
    fixture.detectChanges();
    tick(1);
    input.nativeElement.value = value;
    tick(1);
    input.nativeElement.dispatchEvent(new Event('input'));
    tick(1);
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event('blur'));
    tick(1);
    fixture.detectChanges();
  }
});
