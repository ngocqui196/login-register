import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password == v.repassword) ? null : {
    notSame: true
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
        id: [],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required, Validators.minLength(6)]],
        country: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18)]],
        gender: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\+84\d{9,10}$/)]],
      }, {
        validators: comparePassword
      }
    );
  }

  ngOnInit(): void {

  }

  OnSubmit() {
    if (this.loginForm.valid) {
      alert('OK');
    } else {
      console.log(this.loginForm);
      alert('Form không thỏa mãn');
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('repassword').value;

    return password === confirmPassword ? null : {notSame: true};
  }
}
