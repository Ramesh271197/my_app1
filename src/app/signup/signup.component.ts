import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required, this.dateValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileno: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,}$/)])
    });
  }

  dateValidator(control: FormControl): ValidationErrors | null {
    const dob = control.value;
    if (dob) {
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // Date format: YYYY-MM-DD
      if (!dateRegex.test(dob)) {
        return { dateInvalid: true };
      }
      const minDate = new Date('2010-05-05');
      const maxDate = new Date('2020-05-05');
      const dobDate = new Date(dob);
      if (dobDate < minDate || dobDate > maxDate) {
        return { dateInvalid: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form is valid');
      const user: User = this.signupForm.value;
      this.userService.saveUser(user);
      console.log('User saved successfully');
    } else {
      console.log('Form is not valid');
    }
  }
}
