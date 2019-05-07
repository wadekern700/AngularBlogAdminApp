import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public modalRef: BsModalRef, private router: Router) { }
  loginForm: FormGroup;
  @Output() action = new EventEmitter();
  @Input("title") title: string;
  loginFailed = false;
  buttonText: String = "Login"
  register: boolean = false;
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      'email': new FormControl('test@test.com', [Validators.required, Validators.email]),
      'password': new FormControl('password', Validators.required),
      "confirmPassword": new FormControl(null, [Validators.required])
    }, { validator: this.MustMatch('password', 'confirmPassword') });

    if (!this.register) {

      this.ConfirmPassword.disable();

    }

    console.log(this.loginForm);

  }
  loginModeChanged() {
    this.register = !this.register;
    if (this.register) {
      this.ConfirmPassword.enable();
      this.buttonText = "Register";
    }
    else {
      this.ConfirmPassword.disable();
      this.buttonText = "Login";
    }
  }
  get email() {
    if (this.loginForm)
      return this.loginForm.get("email");
  }
  get password() {
    if (this.loginForm)
      return this.loginForm.get("password");
  }
  get ConfirmPassword() {
    if (this.loginForm) {
      return this.loginForm.get("confirmPassword");
    }
  }
  close() {
    this.modalRef.hide();
  }
  onSub() {
    if (!this.register) {
      this.authService.signinUser(this.loginForm.get('email').value, this.loginForm.get('password').value).then(
        (val) => { this.router.navigate(['/dashboard']); this.modalRef.hide(); },
        (err) => this.loginFailed = true
      )
    }
    else {
      this.authService.signupUser(this.loginForm.get('email').value, this.loginForm.get('password').value).then(
        (val) => { this.router.navigate(['/dashboard']); this.modalRef.hide(); },
        (err) => this.loginFailed = true
      )
    }

  }
  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

    }



  }

}
