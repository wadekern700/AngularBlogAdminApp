import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from 'src/app/shared/users.service';
import { Users } from 'src/app/shared/users.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-users-modal',
  templateUrl: './add-users-modal.component.html',
  styleUrls: ['./add-users-modal.component.css']
})
export class AddUsersModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef, public dataservice: DataStorageService, public usersService: UsersService, private formBuilder: FormBuilder, private authService: AuthService) { }
  userForm: FormGroup;
  user: Users;
  users: Users[];
  @Input() title: string = 'Message here...';
  @Input() editMode: boolean = false;
  ngOnInit() {

    this.initForm()
  }

  initForm() {

    console.log(this.editMode)
    let firstName = "";
    let lastName = "";
    let email = "";
    if (this.user != null) {
      firstName = this.user.firstName;
      lastName = this.user.lastName;
      email = this.user.email;
    }
    this.userForm = this.formBuilder.group({
      "firstName": new FormControl(firstName, Validators.required),
      "lastName": new FormControl(lastName, Validators.required),
      "email": new FormControl(email, [Validators.required, Validators.email, this.doesEmailExists.bind(this)]),
      "password": new FormControl(null, [Validators.required]),
      "confirmPassword": new FormControl(null, [Validators.required])
    }, { validator: this.MustMatch('password', 'confirmPassword') });

    // if (this.editMode) {
    //   this.Email.setValidators([Validators.required, Validators.email]);
    //   this.Email.disable();
    //   this.Password.setValidators(null);
    //   this.ConfirmPassword.setValidators(null);
    // }
  }
  get FirstName() {
    if (this.userForm)
      return this.userForm.get("firstName");
  }

  get LastName() {
    if (this.userForm)
      return this.userForm.get("lastName");
  }
  get Email() {
    if (this.userForm)
      return this.userForm.get("email");
  }
  get Password() {
    if (this.userForm)
      return this.userForm.get("password");
  }
  get ConfirmPassword() {
    if (this.userForm)
      return this.userForm.get("confirmPassword");
  }

  doesEmailExists(control: FormControl) {
    console.log(control)
    if (control.value != null) {
      if (this.usersService.doesEmailExists(control.value)) {
        return { "emailExists": true };
      }
      else {
        return null;
      }
    }
  }
  onSub() {
    console.log("in sub")
    if (this.editMode) {
      const use = new Users(this.FirstName.value, this.LastName.value, this.Email.value, this.Password.value);
      this.usersService.editUser(use);
    }
    else {

      this.authService.signupUser(this.Email.value, this.Password.value)
      const use = new Users(this.FirstName.value, this.LastName.value, this.Email.value, this.Password.value);
      this.usersService.addUser(use);

    }
    this.modalRef.hide();
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
  close() {
    this.modalRef.hide();
  }
}
