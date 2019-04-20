import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private authService: AuthService, public modalRef: BsModalRef, private router: Router) { }
  loginForm: FormGroup;
  @Output() action = new EventEmitter();
  @Input("title") title: string;
  loginFailed = false;
  ngOnInit() {

    this.loginForm = new FormGroup(
      {
        'email': new FormControl('test@test.com', [Validators.required, Validators.email]),
        'password': new FormControl('password', Validators.required)
      }
    )

  }
  get email() {

    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  close() {
    this.modalRef.hide();
  }
  onSub() {
    this.authService.signinUser(this.loginForm.get('email').value, this.loginForm.get('password').value).then(
      (val) => { this.action.emit(true); this.router.navigate(['/dashboard']); this.modalRef.hide(); },
      (err) => this.loginFailed = true
    )

  }

}
