import { Component, ViewChild } from '@angular/core';
import { Signup } from '../model/signup';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, NgIf, NgFor, JsonPipe],
})
export class SignupComponent {
  model: Signup = new Signup();
  @ViewChild('f', { static: true }) form!: NgForm;
  langs: string[] = ['English', 'French', 'German'];
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!');
      form.reset();
    }
  }
}
